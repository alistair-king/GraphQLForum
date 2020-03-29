import React, { ReactNode } from 'react'
import cls from 'classnames'

export const Button: React.FC<{
  children: ReactNode,
  secondary?: boolean
}> = ({
  children,
  secondary = false
}) => (
  <button type="button" className={
    cls('font-bold py-2 px-4 rounded',
      {'text-white bg-blue-500 hover:bg-blue-700': !secondary})
  }>
    {children}
  </button>
)
