import React, { useState, ReactNode } from 'react'

export const StateContext = React.createContext({
  get: (key: 'FORUM' | 'THREAD') => ({
    id: 0,
    page: 0
  }),
  set: (key: 'FORUM' | 'THREAD', id: number, page: number) => {}
});

export const StateContextProvider:React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const [state, setState] = useState({
    FORUM: {
      id: 0,
      page: 0
    },
    THREAD: {
      id: 0,
      page: 0
    }
  });
  const provided = {
    get: (key: 'FORUM' | 'THREAD') => state[key],
    set: (key: 'FORUM' | 'THREAD', id: number, page: number) => {
      if (id !== state[key].id || page !== state[key].page) {
        console.log('setState', key, id, page)
        setState({
          ...state,
          [key]: {
            id,
            page
          }
        })
      }
    }
  }
  return (
    <StateContext.Provider value={provided}>
      {children}
    </StateContext.Provider>
  )
}
