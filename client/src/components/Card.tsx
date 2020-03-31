import React, { ReactNode } from 'react'

export const Card: React.FC<{
  children: ReactNode
}> = ({
  children
}) => (
  <div className="flex flex-col">
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        {children}
      </div>
    </div>
  </div>
)