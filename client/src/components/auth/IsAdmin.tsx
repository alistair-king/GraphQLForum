import React, { ReactNode } from 'react'
import { useAuth } from 'react-use-auth'

export const IsAdmin: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated('Adminstrator')) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
