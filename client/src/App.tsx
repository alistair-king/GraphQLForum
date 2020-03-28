import React from 'react'

import { NavBar } from './components/NavBar'
import { Forum } from './features/Forum'
import { Thread } from './features/Thread'

export const App = () => (
  <>
    <NavBar />
    <Forum />
    <Thread />
  </>
)
