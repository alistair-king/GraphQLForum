import React from 'react'

import { Error } from '../components/Error'
import { Page } from '../components/Page'

export const ErrorPage: React.FC<{
  title?: string,
  code?: number,
  message?: string
}> = ({
  title = 'Error',
  code = 500,
  message = "An Error Occured"
}) => (
  <Page title={title}>
    <Error code={code} message={message} />
  </Page>
)
