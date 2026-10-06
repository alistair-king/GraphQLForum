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
 * Set while logout is in progress: the Auth0 SDK has already discarded its
 * tokens, so token requests must stop entirely rather than race the redirect.
 */
let loggingOut = false

export const setLoggingOut = (value: boolean): void => {
  loggingOut = value
}

// auth0-spa-js's internal token renewal rejects with "Missing Refresh
// Token" when the token store is wiped mid-flight (logout), from a promise
// of its own that no caller awaits — a known upstream behavior. It is
// always harmless here: requests degrade to anonymous and the SDK demands
// re-login anyway. Suppress exactly that message; everything else surfaces.
window.addEventListener('unhandledrejection', event => {
  const reason = event.reason instanceof Error
    ? event.reason.message
    : String(event.reason)
  if (reason.includes('Missing Refresh Token')) {
    event.preventDefault()
  }
})

/**
 * Apollo provider that attaches the Auth0 access token to every
 * request/subscription. getAccessTokenSilently throws when logged out,
 * which we treat as "send the request anonymously".
 */
export const AuthedApolloProvider: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { getAccessTokenSilently } = useAuth0()

  const [client] = React.useState(() => {
    const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '/graphql'

    const getToken = async (): Promise<string | undefined> => {
      if (loggingOut) {
        return undefined
      }
      try {
        return await getAccessTokenSilently()
      } catch {
        return undefined
      }
    }

    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken()
      return token
        ? { headers: { ...headers, authorization: `Bearer ${token}` } }
        : { headers }
    })

    const httpLink = createHttpLink({ uri: endpoint })

    const wsUrl = endpoint.startsWith('http')
      ? endpoint.replace(/^http/, 'ws')
      : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}${endpoint}`
    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsUrl,
        connectionParams: async () => {
          const token = await getToken()
          return token ? { authorization: `Bearer ${token}` } : {}
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
