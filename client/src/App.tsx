import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom'

import ReactModal from 'react-modal'
// import { AnimatedSwitch } from './components/AnimatedSwitch'
import { NavBar } from './components/NavBar'

import { HomePage } from './pages/HomePage'
import { ForumPage } from './pages/forumpage'
import { ThreadPage } from './pages/threadpage'
import { NotFoundPage } from './pages/NotFoundPage'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


export const App = () => {
  ReactModal.setAppElement('#root')
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {Routes.map((routeprops, index) =>
            <Route key={index} {...routeprops} />
          )}
        </Switch>
      </BrowserRouter>
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
      '/forum/:id/:pageString',
      '/forum/:id'
    ],
    component: ForumPage
  },
  {
    path: [
      '/thread/:id/:pageString',
      '/thread/:id'
    ],
    component: ThreadPage
  },
  {
    component: NotFoundPage
  }
]

