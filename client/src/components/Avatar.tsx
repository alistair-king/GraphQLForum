import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

export const Avatar: React.FC<{
  user?: string,
  size?: number,
  caption?: string,
  onClick?: () => void
}> = ({
  user,
  size = 24,
  caption,
  onClick
}) => (
  <>
    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out z-20"
      onClick={onClick}
    >
      { user
        ? <img className={`h-${size} w-${size} rounded-full`} src={user} alt="" />
        : <FaUserAlt color="white" />
      }
    </button>
    {caption && 
      <>
        <p className="md:hidden absolute -mt-4 ml-16">{caption}</p>
        <p className="invisible md:visible text-gray-500">{caption}</p>
      </>
    }
  </>
)
