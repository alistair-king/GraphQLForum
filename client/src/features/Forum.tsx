import React, { ReactNode as Node } from 'react'

import { Pagination } from '../components/Pagination'

export const Forum: React.FC = () => (
  <>
    <header className="bg-white shadow ">
      <div className="max-w-7xl mx-auto pb-6 pt-24 px-4 sm:px-6 lg:px-8 flex">
        <h1 className="w-3/4 text-3xl font-bold leading-tight text-gray-900">Open Discussion</h1>
        <span className="w-1/4 text-right"><Commands /></span>
      </div>
    </header>

    <main className="bg-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
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
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </>
)

export const Commands: React.FC = () => (
  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    New Thread
  </button>
)

const Headings: React.FC = () => {
  const Cell: React.FC<{children?: Node}> = ({children}) => (
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
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </div>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">{thread}</div>
          <div className="text-sm leading-5 text-gray-500">{author}</div>
        </div>
      </div>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="text-sm leading-5 text-gray-900 text-right">{replies}</div>
    </td>
    
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="text-sm leading-5 text-gray-500 text-right">{lastpost}</div>
    </td>

    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <a href="/" className="text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">Edit</a>
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

