import React from 'react'

import { Page } from '../components/Page'

import { Forum } from '../features/Forum'

export const ForumPage: React.FC = () => (
  <>
    <Page title="Open Discussion" commands={<Commands />}>
      <Forum />
    </Page>
  </>
)

const Commands: React.FC = () => (
  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    New Thread
  </button>
)

