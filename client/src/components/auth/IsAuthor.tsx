import React, { ReactNode } from 'react'

import { IUser } from '../../types'
import { useAuthState } from '../../state'

export const IsAuthor: React.FC<{
  children: ReactNode,
  author?: IUser
}> = ({
  children,
  author
}) => {
  const { me, isAdmin } = useAuthState()
  if (me?.id !== author?.id && !isAdmin) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
