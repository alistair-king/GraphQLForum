import React, { ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const IsNotAuthenticated: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { isAuthenticated, isLoading } = useAuth0()
  if (isAuthenticated || isLoading) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
