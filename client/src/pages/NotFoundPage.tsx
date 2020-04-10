import React from 'react'

import { Error } from '../components/Error'
import { Page } from '../components/Page'

export const NotFoundPage: React.FC = () => (
  <Page title="Page not Found!!">
    <Error code={404} message="Page not found!" />
  </Page>
)
