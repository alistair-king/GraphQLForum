import React from 'react'

import { Page } from '../components/Page'
import { LinkButton } from '../components/LinkButton'

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
  <LinkButton to="/">
    Reply
  </LinkButton>
)
