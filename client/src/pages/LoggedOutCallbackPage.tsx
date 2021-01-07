import React  from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthState } from '../state'
import { HOME } from '../urls'

export const LoggedOutCallbackPage = () => {
  const history = useHistory()
  const { getRedir } = useAuthState()

  React.useEffect(() => {
      history.push(getRedir())
  }, [history, getRedir])

  return null
}
