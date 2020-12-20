import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChatBubbleOutline } from 'react-icons/md'
import cls from 'classnames'

import { IForum, IThread } from '../types'

import { Card } from '../components/Card'
import { Pagination } from '../components/Pagination'

import { timeAgo } from '../helpers/timeAgo'

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
          <Cell>Title</Cell>
          <Cell>Replies</Cell>
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
          { forum && forum.threads.items.map(thread => <Thread key={thread.id} thread={thread} />)}
        </tbody>
        <Footer />
      </table>
    </Card>
  )
}

const Thread: React.FC<{
  thread: IThread
}> = ({
  thread
}) => (
  <tr>
    <td className="pl-6 pr-2 py-4 border-b border-gray-200">
      <div className="flex-shrink-0 text-gray-500">
        <MdChatBubbleOutline />
      </div>
    </td>
  
    <td className="px-0 py-4 w-full border-b border-gray-200">
      <Link className="flex items-center" to={`/thread/${thread.id}`}>
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">{thread.title}</div>
          <div className="text-sm leading-5 text-gray-500">{thread.author?.name} {timeAgo(thread.when)}</div>
        </div>
      </Link>
    </td>
  
    <td className="px-0 py-4  border-b border-gray-200 whitespace-no-wrap">
      {thread.lastReply?.count !== 0 &&
        <>
          <div className="text-sm leading-5 text-gray-500 text-right">
            {thread.lastReply?.count}
          </div>
          <div className="text-sm leading-5 text-gray-500 text-right">
            by {thread.lastReply?.reply?.author?.name}{' '}
            {timeAgo(thread.lastReply?.reply?.when)}
          </div>
        </>
      }
    </td>

    <td className="px-2 py-4  text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <NewPosts newposts={0} />
    </td>
  </tr>
)


const NewPosts: React.FC<{
  newposts: number
}> = ({
  newposts
}) => {
  if (newposts === 0) {
    return null;
  }
  const className = cls(
    "p-1 border-2 border-transparent rounded focus:outline-none transition duration-150 ease-in-out ml-1",
    {
      'bg-red-700 text-white hover:bg-red-500 hover:text-gray-200': (newposts >= 8),
      'bg-red-500 text-white hover:bg-red-300 hover:text-gray-200': (newposts >= 5 && newposts < 8),
      'bg-gray-300 text-gray-700 hover:bg-gray-200 hover:text-gray-500': (newposts <= 5),
    });
  
  return (
    <Link to="/thread" >
      <div className={className}>
        <span className="whitespace-no-wrap">
          {newposts} &gt;
        </span>
      </div>
    </Link>
  )
}
