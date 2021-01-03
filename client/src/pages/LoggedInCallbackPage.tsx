import React  from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAuth } from 'react-use-auth'
import { useHistory } from 'react-router-dom'

import { LOGIN_USER } from '../gql'
import { useAppState } from '../state'
import { HOME } from '../UrlConstants'

import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

export const LoggedInCallbackPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [loginUser] = useMutation(LOGIN_USER)
  const history = useHistory()
  const { setCode } = useAppState()

  React.useEffect(() => {
    if (isAuthenticated()) {
      loginUser({
        variables: {
          loginUserData: {
            email: user.email,
            code: user.sub,
            name: user.name,
            picture: user.picture
          }
        }
      })
      setCode(user.sub)
      history.push(HOME)
    }
  }, [user, isAuthenticated, loginUser, history, setCode])

  return (
    <Page title="Welcome back">
      <Spinner className="w-full flex justify-center pt-8" />
    </Page>
  )
}
