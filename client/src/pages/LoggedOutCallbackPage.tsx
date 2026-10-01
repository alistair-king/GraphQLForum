import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthState } from '../state'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

export const LoggedOutCallbackPage = () => {
  const navigate = useNavigate()
  const { getRedir } = useAuthState()

  React.useEffect(() => {
    navigate(getRedir())
  }, [navigate, getRedir])

  return (
    <Page title="Good bye">
      <Spinner className="w-full flex justify-center pt-8" />
    </Page>
  )
}
