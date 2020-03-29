import React from 'react'

import { LinkButton } from '../components/LinkButton'
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
  <LinkButton to="/newthread">
    New Thread
  </LinkButton>
)

