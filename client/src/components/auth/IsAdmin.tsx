import React, { ReactNode } from 'react'

import { useAuthState } from '../../state'

export const IsAdmin: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { isAdmin } = useAuthState()
  if (!isAdmin) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
