import React, { ReactNode, useState } from 'react'

import { Button } from './Button'

export const Modal: React.FC<{
  children: ReactNode,
  title: string
}> = ({
  children,
  title
}) => {
  return (
    <>
      <div className="modal pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </div>

          <div className="px-6 py-3">
            {children}
          </div>
        
          <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <Button>Action</Button>
            <Button secondary>Close</Button>
          </div>
        
        </div>
      </div>
    </>
  )
}
