import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

import { LOGIN, ME } from '../gql'
import { IUser } from '../types'
import { HOME, POST_LOGOUT_CALLBACK } from '../urls'

const REDIR_KEY = 'graphqlforum.redir'
const SESSION_LOGIN_KEY = 'graphqlforum.login-recorded'

const rolesNamespace =
  import.meta.env.VITE_AUTH0_NAMESPACE ?? 'https://graphqlforum.com'

export const AuthContext = React.createContext({
  me: undefined as IUser | undefined,
  isAdmin: false,
  login: (_returnTo?: string) => {},
  logout: (): void => {},
  getRedir: (): string => HOME,
  setRedir: (_url: string) => {},
})

/**
 * Bridges Auth0 authentication with the API's user records:
 * - `me` is the API-side user (fetched with the access token)
 * - `login` triggers the Auth0 redirect, remembering the current location
 * - the `login` GraphQL mutation is recorded once per browser session so
 *   the server sees one login per session, not one per page load
 */
export const AuthContextProvider: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0()
  const [doLogin] = useMutation(LOGIN)
  const [me, setMe] = useState<IUser>()
  const loginSent = useRef(false)

  const { data } = useQuery<{ me: IUser }>(ME, {
    skip: !isAuthenticated,
  })

  useEffect(() => {
    if (data?.me) {
      setMe(data.me)
    }
  }, [data])

  useEffect(() => {
    if (!isAuthenticated || isLoading || loginSent.current) {
      return
    }
    loginSent.current = true
    if (!sessionStorage.getItem(SESSION_LOGIN_KEY)) {
      sessionStorage.setItem(SESSION_LOGIN_KEY, '1')
      doLogin().catch(() => {
        sessionStorage.removeItem(SESSION_LOGIN_KEY)
      })
    }
  }, [isAuthenticated, isLoading, doLogin])

  const roles: string[] =
    (user?.[`${rolesNamespace}/roles`] as string[] | undefined) ?? []

  const provided = {
    me,
    isAdmin: roles.includes('Administrator'),
    login: (returnTo?: string) => {
      setRedir(returnTo ?? window.location.pathname)
      loginWithRedirect({
        appState: { returnTo: returnTo ?? window.location.pathname },
      })
    },
    logout: () => {
      setRedir(window.location.pathname)
      sessionStorage.removeItem(SESSION_LOGIN_KEY)
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin + POST_LOGOUT_CALLBACK,
        },
      })
    },
    getRedir: (): string => sessionStorage.getItem(REDIR_KEY) ?? HOME,
    setRedir: (url: string) => sessionStorage.setItem(REDIR_KEY, url),
  }

  return (
    <AuthContext.Provider value={provided}>
      {children}
    </AuthContext.Provider>
  )
}

function setRedir(url: string) {
  sessionStorage.setItem(REDIR_KEY, url)
}
