import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { AnimatedSwitch } from './components/AnimatedSwitch'
import { NavBar } from './components/NavBar'

import { ForumPage } from './pages/ForumPage'
import { ThreadPage } from './pages/ThreadPage'

export const App = () => (
  <>
    <BrowserRouter>
      <AnimatedSwitch>
        {Routes.map((routeprops, index) =>
          <Route key={index} {...routeprops} />
        )}
      </AnimatedSwitch>
    </BrowserRouter>
    <NavBar />
  </>
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

