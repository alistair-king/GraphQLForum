import React, { ReactNode } from 'react'
import { useAuth } from 'react-use-auth'

import { IUser } from '../../types'
import { useAuthState } from '../../state'

export const IsAuthor: React.FC<{
  children: ReactNode,
  author?: IUser
}> = ({
  children,
  author
}) => {
  const { isAuthorized } = useAuth()
  const { getUser } = useAuthState()
  if (getUser()?.id !== author?.id && !isAuthorized('Administrator')) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
