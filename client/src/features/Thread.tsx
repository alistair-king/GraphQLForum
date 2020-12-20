import React from 'react'
import { MdDelete, MdLock, MdNotifications } from 'react-icons/md'

import { IThread } from '../types'
import { EditThread } from '../actions/EditThread'
import { ActionButton } from '../components/ActionButton'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import { Content } from '../components/Content'
import { Pagination } from '../components/Pagination'
import { timeAgo } from '../helpers/timeAgo'

import { Reply } from './Reply'

export const Thread: React.FC<{
  thread: IThread,
  page: number,
  setPage: (page: number) => void
}> = ({
  thread,
  page,
  setPage
}) => {

  return (
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
          
          <Content className="w-auto md:w-4/5 py-3 md:py-2 px-3 md:px-6" content={thread.content} />
        </div>
    
        <div className="px-2 py-2 border-b border-gray-200 bg-gray-100 text-xs leading-4 font-medium text-gray-500 flex justify-between">
          <div>
            <EditThread thread={thread} />
            <ActionButton tooltip="Notifications"><MdNotifications /></ActionButton>
            <ActionButton tooltip="Lock"><MdLock /></ActionButton>
            <ActionButton warning tooltip="Delete"><MdDelete /></ActionButton>   
          </div>
            
          <Pagination activepage={page} count={thread?.replies?.count || 0} setPage={setPage}/>
          
        </div>
    
      </Card>

      {thread && thread.replies && thread.replies.items && thread?.replies?.items.map(reply =>
        <Reply key={reply.id} reply={reply} />
      )}

    </>
  )
}
