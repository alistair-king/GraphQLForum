import React from 'react'
import { MdDelete, MdEdit, MdLock, MdNotifications } from 'react-icons/md'

import { ActionButton } from '../components/ActionButton'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import { ImageEmbed } from '../components/ImageEmbed'

import image1 from '../assets/DSC8222.jpg'
import image2 from '../assets/DSC7918.jpg'

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
      <div className="w-auto md:w-4/5 py-3 md:py-2 px-3 md:px-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <ImageEmbed title="Glebe Foreshore" image={image1} />

        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos
          dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
          mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
          cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
          assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
          ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

          <ImageEmbed title="Honey bee" image={image2} />

        <p>
          On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms
          of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and
          equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking
          from toil and pain.</p>
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

