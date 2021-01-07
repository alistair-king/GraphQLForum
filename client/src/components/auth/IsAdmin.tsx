import React, { ReactNode } from 'react'
import { useAuth } from 'react-use-auth'

export const IsAdmin: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { isAuthorized } = useAuth()
  if (!isAuthorized('Administrator')) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
