import React, { useContext, useState, ReactNode } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from 'react-use-auth'
import createPersistedState from 'use-persisted-state';

import { GET_USER } from '../gql'
import { IUser } from '../types'

const useCode = createPersistedState('code');

export const StateContext = React.createContext({
  getNavigation: (key: 'FORUM' | 'THREAD') => ({
    id: '',
    page: 0
  }),
  setNavigation: (key: 'FORUM' | 'THREAD', id: string, page: number) => {},
  getUser: (): IUser | undefined => undefined,
  setCode: (code: string) => {},
  logoutUser: (): void => {}
 });

export const StateContextProvider:React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const [navigation, setNavigation] = useState({
    FORUM: {
      id: '',
      page: 0
    },
    THREAD: {
      id: '',
      page: 0
    },
  })

  const [code, setCode] = useCode('')
  const [user, setUser] = useState<IUser>();
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
    getNavigation: (key: 'FORUM' | 'THREAD') => navigation[key],
    setNavigation: (key: 'FORUM' | 'THREAD', id: string, page: number) => {
      if (id !== navigation[key].id || page !== navigation[key].page) {
        setNavigation({
          ...navigation,
          [key]: {
            id,
            page
          }
        })
      }
    },
    getUser: () => user,
    setCode,
    logoutUser: () => {
      console.log('AJK logout user')
      setCode('')
      logout()
    }
  }
  return (
    <StateContext.Provider value={provided}>
      {children}
    </StateContext.Provider>
  )
}

export const useAppState = () => useContext(StateContext)
