import React, { useContext, useState, ReactNode } from 'react'
import { useQuery } from '@apollo/react-hooks';

import { GET_USER } from '../gql'
import { IUser } from '../types'

export const StateContext = React.createContext({
  getNavigation: (key: 'FORUM' | 'THREAD') => ({
    id: '',
    page: 0
  }),
  setNavigation: (key: 'FORUM' | 'THREAD', id: string, page: number) => {},
  getUser: (): IUser | undefined => undefined,
  setUser: (email: string, code: string) => {}
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

  const [userData, setUserData] = useState({
    email: '',
    code:  '',
  })
  const [user, setUser] = useState<IUser>();
  const { data } = useQuery<{user: any}, {email: string, code: string}>(
    GET_USER,
    {
      variables: userData
    }
  )
  if (data && data.user.id !== user?.id) {
    setUser(data.user)
  }

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
    setUser: (email: string, code: string) => {
      setUserData({
        email,
        code
      })
    }
  }
  return (
    <StateContext.Provider value={provided}>
      {children}
    </StateContext.Provider>
  )
}

export const useAppState = () => useContext(StateContext)
