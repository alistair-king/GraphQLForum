import React from 'react'
import { MdDelete, MdEdit, MdLock, MdNotifications } from 'react-icons/md'

import { IThread } from '../types'

import { ActionButton } from '../components/ActionButton'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
// import { ImageEmbed } from '../components/ImageEmbed'

import { timeAgo } from '../helpers/timeAgo'

export const Thread: React.FC<{
  thread: IThread
}> = ({
  thread
}) => (
  <>
    <Card>

      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <div className="md:hidden absolute">
          <Avatar size={12} caption={thread?.author?.name} />
        </div>
        <div className="ml-16 md:ml-0">{timeAgo(thread.when)}</div>
      </div>
  
      <div className="bg-white flex">
        <div className="hidden md:flex w-auto md:w-1/5 py-10 px-6 flex-col items-center">
          <Avatar size={24} caption={thread?.author?.name} />
        </div>
        
        { thread.content&& <div className="w-auto md:w-4/5 py-3 md:py-2 px-3 md:px-6" dangerouslySetInnerHTML={{ __html: thread.content }} /> }

      </div>
  
      <div className="px-2 py-2 border-b border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <ActionButton tooltip="Edit"><MdEdit /></ActionButton>  
        <ActionButton tooltip="Notifications"><MdNotifications /></ActionButton>
        <ActionButton tooltip="Lock"><MdLock /></ActionButton>
        <ActionButton warning tooltip="Delete"><MdDelete /></ActionButton>            
      </div>
  
    </Card>

    {thread && thread.replies && thread.replies.items && thread?.replies?.items.map(reply =>
      <Card>

        <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          <div className="md:hidden absolute">
            <Avatar size={12} caption={reply?.author?.name} />
          </div>
          <div className="ml-16 md:ml-0">{timeAgo(reply.when)}</div>
        </div>

        <div className="bg-white flex">
          <div className="hidden md:flex w-auto md:w-1/5 py-10 px-6 flex-col items-center">
            <Avatar size={24} caption={reply?.author?.name} />
          </div>
          <div className="w-auto md:w-4/5 py-3 md:py-2 px-3 md:px-6" dangerouslySetInnerHTML={{ __html: reply.content }} />

        </div>
      
      </Card>
    )}

  </>
)



