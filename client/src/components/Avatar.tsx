import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

export const Avatar: React.FC<{
  picture?: string,
  /** size in Tailwind spacing units (x 0.25rem): 8 = 2rem, 12 = 3rem, 24 = 6rem */
  size?: number,
  caption?: string,
  onClick?: () => void
}> = ({
  picture,
  size = 24,
  caption,
  onClick
}) => {
  // dimensions via inline style: dynamically-built class names like
  // `h-${size}` never match Tailwind's literal-class scanning
  const box = { width: `${size / 4}rem`, height: `${size / 4}rem` }
  return (
    <>
      <button
        className="flex text-sm border-2 border-transparent rounded-full overflow-hidden focus:outline-none focus:border-white transition duration-150 ease-in-out z-20"
        onClick={onClick}
        style={box}
      >
        { picture
          ? <img className="rounded-full object-cover h-full w-full" src={picture} alt="" />
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
}
