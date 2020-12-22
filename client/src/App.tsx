import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom'

import ReactModal from 'react-modal'
// import { AnimatedSwitch } from './components/AnimatedSwitch'
import { NavBar } from './components/NavBar'

import { HomePage } from './pages/homepage'
import { ForumPage } from './pages/forumpage'
import { ThreadPage } from './pages/threadpage'
import { NotFoundPage } from './pages/NotFoundPage'

import { StateContextProvider } from './state'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});


export const App = () => {
  ReactModal.setAppElement('#root')
  return (
    <ApolloProvider client={client}>
      <StateContextProvider>
        <BrowserRouter>
          <NavBar />
          <Switch>
            {Routes.map((routeprops, index) =>
              <Route key={index} {...routeprops} />
            )}
          </Switch>
        </BrowserRouter>
      </StateContextProvider>
    </ApolloProvider>
  )
}

const Routes: RouteProps[] = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: [
      '/:forumId/:forumPage/:threadId/:threadPage',
      '/:forumId/:forumPage/:threadId'
    ],
    component: ThreadPage
  },
  {
    path: [
      '/:forumId/:forumPage',
      '/:forumId'
    ],
    component: ForumPage
  },
  {
    component: NotFoundPage
  }
]

