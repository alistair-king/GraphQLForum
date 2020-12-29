import React, { useState, ReactNode } from 'react'

export const StateContext = React.createContext({
  get: (key: 'FORUM' | 'THREAD') => ({
    id: '',
    page: 0
  }),
  set: (key: 'FORUM' | 'THREAD', id: string, page: number) => {},
  userId: '1111111-1111-1111-1111-1111-11111111'
});

export const StateContextProvider:React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const [state, setState] = useState({
    FORUM: {
      id: '',
      page: 0
    },
    THREAD: {
      id: '',
      page: 0
    }
  });
  const provided = {
    get: (key: 'FORUM' | 'THREAD') => state[key],
    set: (key: 'FORUM' | 'THREAD', id: string, page: number) => {
      if (id !== state[key].id || page !== state[key].page) {
        setState({
          ...state,
          [key]: {
            id,
            page
          }
        })
      }
    },
    userId: '1111111-1111-1111-1111-1111-11111111'
  }
  return (
    <StateContext.Provider value={provided}>
      {children}
    </StateContext.Provider>
  )
}
