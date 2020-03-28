import React from 'react'

import { Page } from '../components/Page'

import { Thread } from '../features/Thread'

export const ThreadPage: React.FC = () => (
  <>
    <Page
      title="12,000km for the Heart Foundation"
      commands={<Commands />}
      back="/forum"
    >
      <Thread />
    </Page>
  </>
)

const Commands: React.FC = () => (
  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Reply
  </button>
)
