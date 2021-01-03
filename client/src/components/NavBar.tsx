import React, { ReactNode } from 'react'
import { useAuth } from 'react-use-auth'
import cls from 'classnames'
import { MdMenu, MdNotifications } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

import { useAppState } from '../state'
import { IsAuthenticated } from '../components/auth/IsAuthenticated'
import { IsNotAuthenticated } from '../components/auth/IsNotAuthenticated'
import { Avatar } from './Avatar'
import { Logo } from './Logo'

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="bg-gray-800 w-full fixed z-30">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
              <MdMenu onClick={() => setIsOpen(!isOpen)} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Logo className="relative" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <IsAuthenticated>
              <BellButton />
              <div className="ml-3 relative">
                <DropMenu />
              </div>
            </IsAuthenticated>              
            <IsNotAuthenticated>
              <LoginButton />
            </IsNotAuthenticated>
          </div>
        </div>
      </div>
    </nav>
  )
}

// const MenuItem: React.FC<{
//   to?: string,
//   children: ReactNode
// }> = ({
//   to = '/',
//   children
// }) => (
//   <Link to={to} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">{children}</Link>
// )

const LoginButton: React.FC = () => {
  const { login } = useAuth()
  return (
    <button onClick={login} className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
      <FaUserAlt />
    </button>
  )
}
  
const BellButton: React.FC = () => (
  <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
    <MdNotifications />
  </button>
)
  
const DropMenu:React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { getUser, logoutUser } = useAppState()
  const user = getUser()
  return (
    <>
      <Avatar size={8} user={user?.picture} onClick={() => setIsOpen(!isOpen)} />
      <DropMenuPane isOpen={isOpen}>
        <DropMenuItem>Your Profile</DropMenuItem>
        <DropMenuItem>Settings</DropMenuItem>
        <DropMenuAction onClick={logoutUser}>Sign out</DropMenuAction>
      </DropMenuPane>
    </>
  )
}

const DropMenuPane: React.FC<{isOpen: boolean, children: ReactNode}> = ({isOpen, children}) => (
  <div className={cls('origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg', { 'hidden': !isOpen })}>
    <div className="py-1 rounded-md bg-white shadow-xs">
      {children}
    </div>
  </div>
)

const DropMenuItem: React.FC<{
  href?: string,
  children: ReactNode
}> = ({
  href = '/',
  children
}) => (
  <a href={href} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">{children}</a>
)

const DropMenuAction: React.FC<{
  onClick?: () => void,
  children: ReactNode
}> = ({
  onClick,
  children
}) => (
  <span onClick={onClick} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">{children}</span>
)
