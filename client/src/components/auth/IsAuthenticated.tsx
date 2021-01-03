import React, { ReactNode } from 'react'
import { useAuth } from 'react-use-auth'

export const IsAuthenticated: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated()) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
