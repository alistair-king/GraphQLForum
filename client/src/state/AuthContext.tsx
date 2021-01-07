import React, { useState, ReactNode } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useAuth } from 'react-use-auth'
import createPersistedState from 'use-persisted-state'

import { GET_USER } from '../gql'
import { IUser } from '../types'
import { HOME, POST_LOGOUT_CALLBACK } from '../urls'

const useCode = createPersistedState('code')
const useRedir = createPersistedState('redir')

export const AuthContext = React.createContext({
  getUser: (): IUser | undefined => undefined,
  setCode: (code: string) => {},
  logoutUser: (): void => {},
  getRedir: (): string => HOME,
  setRedir: (url: string) => {}
 })

export const AuthContextProvider:React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const [code, setCode] = useCode('')
  const [user, setUser] = useState<IUser>()
  const [redir, setRedir] = useRedir(HOME)
    const { data } = useQuery<{user: any}, {code: string}>(
    GET_USER,
    {
      variables: {
        code
      }
    }
  )
  if (data && data.user.id !== user?.id) {
    setUser(data.user)
  }

  const { logout } = useAuth()

  const provided = {
    setCode,
    getUser: () => user,
    logoutUser: () => {
      setCode('')
      logout(POST_LOGOUT_CALLBACK)
    },
    setRedir,
    getRedir: (): string => redir,
  }
  return (
    <AuthContext.Provider value={provided}>
      {children}
    </AuthContext.Provider>
  )
}
