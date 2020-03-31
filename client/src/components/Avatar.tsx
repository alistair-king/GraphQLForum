import React from 'react'

export const Avatar: React.FC<{
  user?: string,
  size?: number,
  caption?: string,
  onClick?: () => void
}> = ({
  user = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  size = 24,
  caption,
  onClick
}) => (
  <>
    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
      onClick={onClick}
    >
      <img className={`h-${size} w-${size} rounded-full`} src={user} alt="" />
    </button>
    {caption && 
      <>
        <p className="md:hidden absolute -mt-4 ml-16">{caption}</p>
        <p className="invisible md:visible bg-color-red">{caption}</p>
      </>
    }
  </>
)
