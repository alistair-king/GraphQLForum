import React from 'react'
import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom'
import ReactModal from 'react-modal'
// import { AnimatedSwitch } from './components/AnimatedSwitch'
import { NavBar } from './components/NavBar'

import { ForumPage } from './pages/ForumPage'
import { ThreadPage } from './pages/ThreadPage'

export const App = () => {
  ReactModal.setAppElement('#root')
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {Routes.map((routeprops, index) =>
            <Route key={index} {...routeprops} />
          )}
        </Switch>
      </BrowserRouter>
    </>
  )
}

const Routes: RouteProps[] = [
  {
    path: '/forum',
    component: ForumPage
  },
  {
    path: '/thread',
    component: ThreadPage
  }
]

