import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import {
  BrowserRouter,
  Route,
  RouteProps,
  Switch,
  useHistory
} from 'react-router-dom'
import { AuthConfig } from 'react-use-auth'
import { Auth0 } from 'react-use-auth/auth0'
import ReactModal from 'react-modal'

import * as URL from './urls'
import { AuthContextProvider } from './state/AuthContext'
import { NavigationContextProvider } from './state/NavigationContext'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/homepage'
import { ForumPage } from './pages/forumpage'
import { ThreadPage } from './pages/threadpage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Auth0CallbackPage } from './pages/Auth0CallbackPage'
import { LoggedInCallbackPage } from './pages/LoggedInCallbackPage'
import { LoggedOutCallbackPage } from './pages/LoggedOutCallbackPage'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

export const App = () => {
  ReactModal.setAppElement('#root')

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavigationContextProvider>
          <AuthContextProvider>
            <AuthedSection />
          </AuthContextProvider>
        </NavigationContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const AuthedSection: React.FC = () => {
  const history = useHistory()
  return (
    <AuthConfig
      navigate={history.push}
      authProvider={Auth0}
      params={{
          domain: process.env.REACT_APP_AUTH0_DOMAIN,
          clientID: process.env.REACT_APP_AUTH0_CLIENTID,
          customPropertyNamespace: process.env.REACT_APP_AUTH0_CUSTOM_PROPERTY_NAME_SPACE,
      }}
    >
      <NavBar />
      <Switch>
        {Routes.map((routeprops, index) =>
          <Route key={index} {...routeprops} />
        )}
      </Switch>
    </AuthConfig>
  )
}

const Routes: RouteProps[] = [
  {
    path: [
      URL.HOME,
    ],
    component: HomePage,
    exact: true
  },
  {
    path: URL.POST_AUTH0_CALLBACK,
    component: Auth0CallbackPage
  },
  {
    path: URL.POST_LOGIN_CALLBACK,
    component: LoggedInCallbackPage
  },
  {
    path: URL.POST_LOGOUT_CALLBACK,
    component: LoggedOutCallbackPage
  },
  {
    path: [
      URL.THREAD_PAGE1,
      URL.THREAD_PAGE2
    ],
    component: ThreadPage
  },
  {
    path: [
      URL.FORUM_PAGE1,
      URL.FORUM_PAGE2
    ],
    component: ForumPage
  },
  {
    component: NotFoundPage
  }
]

