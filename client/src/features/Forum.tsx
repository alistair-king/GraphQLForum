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
        <Post thread="12,000km for the Heart Foundation" author="Juju" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="nCoV 2019" author="Nich" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="What oils your gears?" author="Silva^" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="Random Thoughts II " author="Ab" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="Shootings in Christchurch " author="Whiplash" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="Video of the day 2.0 instant ban for links w/o descriptions" author="mark111" replies="100" lastpost="Yesterday 07:57" />
        <Post thread="What are you reading?" author="fixed_truth" replies="100" lastpost="Yesterday 07:57" />
      </tbody>
      <Footer />
    </table>
  </Card>
)

const Headings: React.FC = () => {
  const Cell: React.FC<{children?: ReactNode}> = ({children}) => (
    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  )
  return (
    <thead>
      <tr>
        <Cell />
        <Cell>Name</Cell>
        <Cell>Replies</Cell>
        <Cell>Last Post</Cell>
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
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="flex-shrink-0 h-10 w-10 text-gray-500">
        <MdChatBubbleOutline />
      </div>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <Link className="flex items-center" to='/thread'>
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">{thread}</div>
          <div className="text-sm leading-5 text-gray-500">{author}</div>
        </div>
      </Link>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="text-sm leading-5 text-gray-900 text-right">{replies}</div>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="text-sm leading-5 text-gray-500 text-right">{lastpost}</div>
    </td>

    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
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

