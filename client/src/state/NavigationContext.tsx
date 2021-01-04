import React, { useState, ReactNode } from 'react'

export enum NavType {
  FORUM = 'FORUM',
  THREAD = 'THREAD'
}

export const NavigationContext = React.createContext({
  get: (key: NavType) => ({
    id: '',
    page: 0
  }),
  set: (key: NavType, id: string, page: number) => {},
 })

export const NavigationContextProvider:React.FC<{
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

  const provided = {
    get: (key: NavType) => navigation[key],
    set: (key: NavType, id: string, page: number) => {
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
  }
  return (
    <NavigationContext.Provider value={provided}>
      {children}
    </NavigationContext.Provider>
  )
}

