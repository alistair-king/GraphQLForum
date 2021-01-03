import React, { useState, ReactNode } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import cls from 'classnames'

export const ActionsMenu: React.FC<{
  children: ReactNode,
}> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={toggleIsOpen} className={
          cls({
            'inline-flex justify-center w-full rounded-md': true,
            'border border-gray-300 shadow-sm': true,
            'px-1 py-1': true,
            'bg-white': !isOpen,
            'bg-gray-100': isOpen,
            'text-sm font-medium text-gray-700 hover:bg-gray-50': true,
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500': true,
          })} aria-haspopup="true" aria-expanded="true">
          
          <HiChevronDown />
        </button>
      </div>

      {isOpen && <div className="origin-top-right absolute z-10 right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {children}
        </div>
      </div> }
    </div>
  )
}
