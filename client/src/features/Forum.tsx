import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChevronRight, MdChatBubbleOutline } from 'react-icons/md'

import { Card } from '../components/Card'
import { Pagination } from '../components/Pagination'

export const Forum: React.FC = () => (
  <Card>
    <table className="min-w-full">
      <Headings />
      <tbody className="bg-white">
        <Post thread="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium" author="Juju" replies="133" lastpost="Today 06:36" />
        <Post thread="At vero eos et accusamus et iusto odio dignissimos ducimus" author="Nich" replies="12" lastpost="Today 04:37" />
        <Post thread="est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam?" author="Silva^" replies="164" lastpost="Today 11:57" />
        <Post thread="Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus" author="Ab" replies="101" lastpost="Today 07:57" />
        <Post thread="On the other hand, we denounce with righteous indignation" author="Whiplash" replies="140" lastpost="Yesterday 16:57" />
        <Post thread="But in certain circumstances and owing to the claims of duty or the obligations of business" author="mark111" replies="109" lastpost="Yesterday 12:34" />
        <Post thread="Quis autem vel eum iure reprehenderit?" author="fixed_truth" replies="13" lastpost="2 days ago" />
      </tbody>
      <Footer />
    </table>
  </Card>
)

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

const Post: React.FC<{
  thread: string,
  author: string,
  replies: string,
  lastpost: string
}> = ({
  thread,
  author,
  replies,
  lastpost
}) => (
  <tr>
    <td className="pl-6 pr-2 py-4 border-b border-gray-200">
      <div className="flex-shrink-0 text-gray-500">
        <MdChatBubbleOutline />
      </div>
    </td>
    
    <td className="px-0 py-4 w-full border-b border-gray-200">
      <Link className="flex items-center" to='/thread'>
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">{thread}</div>
          <div className="text-sm leading-5 text-gray-500">{author}</div>
        </div>
      </Link>
    </td>
    
    <td className="px-0 py-4  border-b border-gray-200 whitespace-no-wrap">
      <div className="text-sm leading-5 text-gray-500 text-right">{replies}</div>
      <div className="text-sm leading-5 text-gray-500 text-right">{lastpost}</div>
    </td>

    <td className="px-2 py-4  text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <Link to="/thread" className="text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
        <MdChevronRight />
      </Link>
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

