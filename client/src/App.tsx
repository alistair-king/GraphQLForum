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

import * as URL from './UrlConstants'
import { StateContextProvider } from './state'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/homepage'
import { ForumPage } from './pages/forumpage'
import { ThreadPage } from './pages/threadpage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Auth0CallbackPage } from './pages/Auth0CallbackPage'
import { LoggedInCallbackPage } from './pages/LoggedInCallbackPage'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

export const App = () => {
  ReactModal.setAppElement('#root')

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StateContextProvider>
          <AuthedSection />
        </StateContextProvider>
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
          clientID: process.env.REACT_APP_AUTH0_CLIENTID
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
      URL.LOGOUT
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

