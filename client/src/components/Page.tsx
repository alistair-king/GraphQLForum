import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdChevronLeft } from 'react-icons/md'

export const Page: React.FC<{
  children?: ReactNode,
  title?: ReactNode,
  back?: string
  commands?: ReactNode
}> = ({
  children,
  title,
  back,
  commands
}) => (
  <div className="w-full">
    
    <header className="bg-white shadows">
      <div className="max-w-7xl mx-auto pb-6 pt-24 px-4 sm:px-6 lg:px-8 flex">
        <h1 className="w-3/4 text-3xl font-bold leading-tight text-gray-900">
          {back && <Link to={back}><MdChevronLeft className="inline text-blue-500 hover:text-blue-700" /></Link>}
          {title}
        </h1>
        <span className="w-1/4 text-right">{commands}</span>
      </div>
    </header>

    <main className="bg-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">

                {children}
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
)
