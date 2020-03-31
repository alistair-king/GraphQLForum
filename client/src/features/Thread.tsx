import React from 'react'
import { MdDelete, MdEdit, MdLock, MdNotifications } from 'react-icons/md'

import { ActionButton } from '../components/ActionButton'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'

export const Thread: React.FC = () => (
  <Card>
  
    <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
      <div className="md:hidden absolute">
        <Avatar size={12} caption="Whiplash" />
      </div>
      <div className="ml-16 md:ml-0">24th December 2020 9:28am</div>
    </div>
    
    <div className="bg-white flex">
      <div className="hidden md:flex w-auto md:w-1/5 py-10 px-6 flex-col items-center">
        <Avatar size={24} caption="Whiplash" />
      </div>
      <div className="w-auto md:w-4/5 py-2 px-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
    
    <div className="px-2 py-2 border-b border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">                
      <ActionButton tooltip="Edit"><MdEdit /></ActionButton>  
      <ActionButton tooltip="Notifications"><MdNotifications /></ActionButton>
      <ActionButton tooltip="Lock"><MdLock /></ActionButton>
      <ActionButton warning tooltip="Delete"><MdDelete /></ActionButton>            
    </div>
    
  </Card>
)

