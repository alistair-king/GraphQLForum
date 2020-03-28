import React from 'react'

export const Pagination: React.FC = () => (
  <>
    <div className="flex flex-row-reverse">
      <ul className="flex list-reset border border-grey-light rounded bg-white font-sans">
        <li><a className="block hover:text-white hover:bg-blue-500 ßborder-r border-grey-light px-3 py-2" href="/">Previous</a></li>
        <li><a className="block text-white bg-blue-500 border-r border-blue px-3 py-2" href="/">1</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 border-r border-grey-light px-3 py-2" href="/">2</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 border-r border-grey-light px-3 py-2" href="/">3</a></li>
        <li><a className="block hover:text-white hover:bg-blue-700 px-3 py-2" href="/">Next</a></li>
      </ul>
    </div>
  </>
)
