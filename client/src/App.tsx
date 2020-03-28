import React from 'react'
import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom'

import { ForumPage } from './pages/ForumPage'
import { ThreadPage } from './pages/ThreadPage'

export const App = () => (
  <BrowserRouter>
    <Switch>
      {Routes.map((routeprops, index) =>
        <Route key={index} {...routeprops} />
      )}
    </Switch>
  </BrowserRouter>
)


const Routes: RouteProps[] = [
  {
    path: '/thread',
    component: ThreadPage
  },
  {
    path: '/forum',
    component: ForumPage
  }
]

