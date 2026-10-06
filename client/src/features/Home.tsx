import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChatBubbleOutline } from 'react-icons/md'

import { IForum } from '../types'
import { makeForumUrl } from '../urls'
import { Card } from '../components/Card'

const HeadingCell: React.FC<{children?: ReactNode}> = ({children}) => (
  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase whitespace-nowrap">
    {children}
  </th>
)

const HomeHeadings: React.FC = () => (
  <thead>
    <tr>
      <HeadingCell />
      <HeadingCell>Forum</HeadingCell>
      <HeadingCell>Threads</HeadingCell>
      <HeadingCell>Posts</HeadingCell>
      <HeadingCell>Last Post</HeadingCell>
    </tr>
  </thead>
)

export const Home: React.FC<{
  forums: IForum[],
}> = ({
  forums
}) => {
  return (
    <Card>
      <table className="min-w-full">
        <HomeHeadings />
        <tbody className="bg-white">
          { forums.map(forum => <Forum key={forum.id} forum={forum} />)}
        </tbody>
      </table>
    </Card>
  )
}

const Forum: React.FC<{
  forum: IForum
}> = ({
  forum
}) => {

  return (
    <tr>
      <td className="pl-6 pr-2 py-4 border-b border-gray-200">
        <div className="shrink-0 text-gray-500">
          <MdChatBubbleOutline />
        </div>
      </td>
    
      <td className="px-0 py-4 w-full border-b border-gray-200">
        <Link className="flex items-center" to={makeForumUrl(forum.id)}>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">{forum.name}</div>
            <div className="text-sm leading-5 text-gray-500">{forum.description}</div>
          </div>
        </Link>
      </td>
    
      <td className="px-0 py-4  border-b border-gray-200 whitespace-nowrap">
      </td>

      <td className="px-2 py-4  text-right border-b border-gray-200 text-sm leading-5 font-medium">
      </td>

      <td className="px-2 py-4  text-right border-b border-gray-200 text-sm leading-5 font-medium">
      </td>
    </tr>
  )
}
