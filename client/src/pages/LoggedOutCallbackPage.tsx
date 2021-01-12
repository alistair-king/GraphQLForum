import React  from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthState } from '../state'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

export const LoggedOutCallbackPage = () => {
  const history = useHistory()
  const { getRedir } = useAuthState()

  React.useEffect(() => {
    history.push(getRedir())
  }, [history, getRedir])

  return (
    <Page title="Good bye">
      <Spinner className="w-full flex justify-center pt-8" />
    </Page>
  )
}
