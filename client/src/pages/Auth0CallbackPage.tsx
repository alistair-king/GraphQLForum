import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

export const Auth0CallbackPage = () => {
  const { handleRedirectCallback, error, isLoading } = useAuth0()

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    handleRedirectCallback().catch(() => {
      // already handled / not on a callback URL; onRedirectCallback
      // takes care of navigation
    })
  }, [handleRedirectCallback, error, isLoading])

  return (
    <Page title="Signing in...">
      <Spinner className="w-full flex justify-center pt-8" />
    </Page>
  )
}
