import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChatBubbleOutline } from 'react-icons/md'

import { IForum, IThread } from '../types'
import { makeThreadUrl } from '../urls'
import { IsAdmin } from '../components/auth/IsAdmin'
import { ActionsMenu } from '../components/ActionsMenu'
import { Card } from '../components/Card'
import { Pagination } from '../components/Pagination'
import { timeAgo } from '../helpers/timeAgo'
import { DeleteThread } from '../pages/forumpage/DeleteThread'

export const Forum: React.FC<{
  forum: IForum,
  page: number,
  setPage: (page: number) => void    
}> = ({
  forum,
  page,
  setPage
}) => {
  
  const Headings: React.FC = () => {
    const Cell: React.FC<{children?: ReactNode}> = ({children}) => (
      <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase">
        {children}
      </th>
    )
    return (
      <thead>
        <tr>
          <Cell />
          <Cell>Title / Starter</Cell>
          <Cell>Replies</Cell>
          <Cell>Last reply</Cell>
          <Cell />
        </tr>
      </thead>
    )
  }

  const Footer: React.FC = () => {
    return (
      <tfoot>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" colSpan={5}>
            <Pagination activepage={page} count={forum.threads.count} setPage={setPage}/>
          </th>
        </tr>
      </tfoot>
    )
  }

  return (
    <Card>
      <table className="min-w-full">
        <Headings />
        <tbody className="bg-white">
          { forum && forum.threads.items.map(thread => 
            <Thread
              key={thread.id}
              forum={forum}
              thread={thread}
              page={page}
            />
          )}
        </tbody>
        <Footer />
      </table>
    </Card>
  )
}

const Thread: React.FC<{
  forum: IForum,
  thread: IThread,
  page: number
}> = ({
  forum,
  thread,
  page
}) => (
  <tr>
    <td className="pl-6 pr-2 py-4 border-b border-gray-200">
      <div className="flex-shrink-0 text-gray-500">
        <MdChatBubbleOutline />
      </div>
    </td>
  
    <td className="px-0 py-4 w-full border-b border-gray-200">
      <Link className="flex items-center" to={makeThreadUrl(forum.id, page, thread.id)}>
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">{thread.title}</div>
          <div className="text-sm leading-5 text-gray-500">{thread.author?.name} {timeAgo(thread.when)}</div>
        </div>
      </Link>
    </td>
  
    <td className="px-4 py-4 border-b border-gray-200 whitespace-no-wrap text-right text-gray-500">
      {thread.lastReply?.count}
    </td>

    <td className="px-0 py-4  border-b border-gray-200 whitespace-no-wrap">
      {thread.lastReply?.count !== 0 &&
        <div className="text-xs leading-5 text-gray-500 text-right">
          by {thread.lastReply?.reply?.author?.name}{' '}
        <div className="text-xs leading-5 text-gray-500 text-right">
        </div>
          {timeAgo(thread.lastReply?.reply?.when)}
        </div>
      }
    </td>

    <td className="px-2 py-4 text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <IsAdmin>
        <ActionsMenu>
          <DeleteThread thread={thread} label="Delete" />
        </ActionsMenu>
      </IsAdmin>
    </td>
  </tr>
)


