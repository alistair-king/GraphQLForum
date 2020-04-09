import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChatBubbleOutline } from 'react-icons/md'
import cls from 'classnames'

import { IForum, IThread } from '../types'

import { Card } from '../components/Card'
import { Pagination } from '../components/Pagination'

export const Forum: React.FC<{
  forum: IForum
}> = ({
  forum
}) => {
  return (
    <Card>
      <table className="min-w-full">
        <Headings />
        <tbody className="bg-white">
          { forum && forum.threads.items.map(thread => <Thread key={thread.id} thread={thread} replies="133" lastpost="Today 06:36" newposts={21} />)}
        </tbody>
        <Footer />
      </table>
    </Card>
  )
}

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

const Thread: React.FC<{
  thread: IThread,
  replies: string,
  lastpost: string,
  newposts?: number
}> = ({
  thread,
  replies,
  lastpost,
  newposts = 0
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
          <div className="text-sm leading-5 text-gray-500">{thread.author.name}</div>
        </div>
      </Link>
    </td>
    
    <td className="px-0 py-4  border-b border-gray-200 whitespace-no-wrap">
      <div className="text-sm leading-5 text-gray-500 text-right">{replies}</div>
      <div className="text-sm leading-5 text-gray-500 text-right">{lastpost}</div>
    </td>

    <td className="px-2 py-4  text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <NewPosts newposts={newposts} />
    </td>
  </tr>
)


const Footer: React.FC = () => {
  return (
    <tfoot>
      <tr>
        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" colSpan={5}>
          <Pagination />
        </th>
      </tr>
    </tfoot>
  )
}

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
