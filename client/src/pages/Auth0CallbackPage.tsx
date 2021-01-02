import React from 'react'
import { useAuth } from 'react-use-auth'

import { POST_LOGIN_CALLBACK } from '../UrlConstants'

export const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth()
  React.useEffect(() => {
    handleAuthentication({ postLoginRoute: POST_LOGIN_CALLBACK})
  }, [handleAuthentication])

  return null 
}
