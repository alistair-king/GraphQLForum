import React, { ReactNode } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { useAuth0 } from '@auth0/auth0-react'
import { createClient } from 'graphql-ws'

/**
 * Apollo provider that attaches the Auth0 access token to every
 * request/subscription once the user is authenticated.
 */
export const AuthedApolloProvider: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const authedRef = React.useRef(isAuthenticated)

  React.useEffect(() => {
    authedRef.current = isAuthenticated
  }, [isAuthenticated])

  const [client] = React.useState(() => {
    const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '/graphql'

    const authLink = setContext(async (_, { headers }) => {
      if (!authedRef.current) {
        return { headers }
      }
      try {
        const token = await getAccessTokenSilently()
        return {
          headers: { ...headers, authorization: `Bearer ${token}` },
        }
      } catch {
        return { headers }
      }
    })

    const httpLink = createHttpLink({ uri: endpoint })

    const wsUrl = endpoint.startsWith('http')
      ? endpoint.replace(/^http/, 'ws')
      : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}${endpoint}`
    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsUrl,
        connectionParams: async () => {
          if (!authedRef.current) {
            return {}
          }
          try {
            return {
              authorization: `Bearer ${await getAccessTokenSilently()}`,
            }
          } catch {
            return {}
          }
        },
      }),
    )

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      authLink.concat(httpLink),
    )

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  })

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
