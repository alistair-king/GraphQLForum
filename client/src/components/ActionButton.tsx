import React, { ReactNode } from 'react'
import cls from 'classnames'

export const ActionButton: React.FC<{
  children: ReactNode,
  onClick?: () => void,
  warning?: boolean,
  tooltip?: string
}> = ({
  children,
  onClick,
  warning,
  tooltip
}) => (
  <button 
    onClick={onClick}
    className={cls('p-1 border-2 border-transparent rounded-full focus:outline-none  transition duration-150 ease-in-out ml-1 tooltip',
      {
        'bg-gray-300 text-gray-700 hover:text-red-700 hover:bg-gray-500 focus:text-red-300 focus:bg-gray-500': warning,
        'bg-gray-300 text-gray-700 hover:text-white hover:bg-gray-500 focus:text-white focus:bg-gray-500': !warning
      })}
  >
    {tooltip && <span className='tooltip-text text-black bg-white shadow p-3 -mt-12 -ml-6'>{tooltip}</span>}
    {children}
  </button>  
)
