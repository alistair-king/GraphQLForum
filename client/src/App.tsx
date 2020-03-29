import React from 'react'
import { BrowserRouter, Route, RouteProps } from 'react-router-dom'
import ReactModal from 'react-modal'
import { AnimatedSwitch } from './components/AnimatedSwitch'
import { NavBar } from './components/NavBar'

import { ForumPage } from './pages/ForumPage'
import { ThreadPage } from './pages/ThreadPage'

export const App = () => {
	ReactModal.setAppElement('#root');
  return (
    <>
      <BrowserRouter>
        <AnimatedSwitch>
          {Routes.map((routeprops, index) =>
            <Route key={index} {...routeprops} />
          )}
        </AnimatedSwitch>
        <NavBar />
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

