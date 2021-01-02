import React from 'react'

import { IReply } from '../types'
import { EditReply } from '../actions/EditReply'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import { Content } from '../components/Content'
import { timeAgo } from '../helpers/timeAgo'
import { DeleteReply } from '../pages/threadpage/DeleteReply'

export const Reply: React.FC<{
  reply: IReply
}> = ({
  reply
}) => (
  <>
    <Card anchor={reply.id}>

      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <div className="md:hidden absolute">
          <Avatar size={12} user={reply?.author?.picture} caption={reply?.author?.name} />
        </div>
        <div className="ml-16 md:ml-0">{timeAgo(reply.when)}</div>
      </div>

      <div className="bg-white flex">
        <div className="hidden md:flex w-auto md:w-1/5 py-10 px-6 flex-col items-center">
          <Avatar size={24} user={reply?.author?.picture} caption={reply?.author?.name} />
        </div>
        <Content className="w-auto md:w-4/5 py-3 md:py-2 px-3 md:px-6" content={reply.content} />
      </div>

      <div className="px-2 py-2 border-b border-gray-200 bg-gray-100 text-xs leading-4 font-medium text-gray-500 flex justify-between">
        <div>
          <EditReply reply={reply} />
          <DeleteReply reply={reply} />
        </div>
      </div>

    </Card>
  </>
)
