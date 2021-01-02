import React, { ReactNode } from 'react'
import cls from 'classnames'

export const Button: React.FC<{
  children: ReactNode,
  type?: 'button' | 'submit' | 'reset',
  secondary?: boolean,
  onClick?: () => void,
  className?: string,
}> = ({
  children,
  type = 'button',
  secondary = false,
  onClick,
  className
}) => (
  <button
    type={type}
    onClick={onClick}
    className={
      cls('font-bold py-2 px-4 rounded',
        className,
        {'text-white bg-blue-500 hover:bg-blue-700': !secondary})
    }>
    {children}
  </button>
)
