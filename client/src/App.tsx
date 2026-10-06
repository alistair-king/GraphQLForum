import React, { type ReactNode } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { Auth0Provider, type AppState } from '@auth0/auth0-react'

import * as URL from './urls'
import { AuthedApolloProvider } from './apollo'
import { AuthContextProvider } from './state/AuthContext'
import { NavigationContextProvider } from './state/NavigationContext'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/homepage'
import { ForumPage } from './pages/forumpage'
import { ThreadPage } from './pages/threadpage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Auth0CallbackPage } from './pages/Auth0CallbackPage'
import { LoggedOutCallbackPage } from './pages/LoggedOutCallbackPage'

export const App = () => {
  return (
    <BrowserRouter>
      <NavigationContextProvider>
        <Auth0ProviderWithNavigate>
          <AuthedApolloProvider>
            <AuthContextProvider>
              <NavBar />
              <Routes>
                <Route path={URL.HOME} element={<HomePage />} />
                <Route
                  path={URL.POST_AUTH0_CALLBACK}
                  element={<Auth0CallbackPage />}
                />
                <Route
                  path={URL.POST_LOGOUT_CALLBACK}
                  element={<LoggedOutCallbackPage />}
                />
                <Route path={URL.THREAD_PAGE1} element={<ThreadPage />} />
                <Route path={URL.THREAD_PAGE2} element={<ThreadPage />} />
                <Route path={URL.FORUM_PAGE1} element={<ForumPage />} />
                <Route path={URL.FORUM_PAGE2} element={<ForumPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AuthContextProvider>
          </AuthedApolloProvider>
        </Auth0ProviderWithNavigate>
      </NavigationContextProvider>
    </BrowserRouter>
  )
}

const Auth0ProviderWithNavigate: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const navigate = useNavigate()

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri:
          window.location.origin + URL.POST_AUTH0_CALLBACK,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      onRedirectCallback={(appState?: AppState) => {
        navigate(appState?.returnTo ?? window.location.pathname)
      }}
      // renew via refresh token + POST instead of the hidden-iframe
      // flow, which embedded browsers and Safari's ITP block
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}
