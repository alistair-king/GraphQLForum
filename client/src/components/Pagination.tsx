import React from 'react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'

export const Pagination: React.FC = () => (
  <>
    <div className="flex flex-row-reverse">
      <ul className="flex list-reset border border-grey-light rounded bg-white font-sans">
        <li><a className="block hover:text-white hover:bg-blue-700 ßborder-r border-grey-light px-3 py-2" href="/"><MdChevronLeft /></a></li>
        <li><a className="block text-white bg-blue-500  hover:bg-blue-700 border-r border-blue px-3 py-2" href="/">1</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 border-r border-grey-light px-3 py-2" href="/">2</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 border-r border-grey-light px-3 py-2" href="/">3</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 px-3 py-2" href="/"><MdChevronRight /></a></li>
      </ul>
    </div>
  </>
)
