import React from 'react'

export const Error: React.FC<{
  code?: number,
  message?: string
}> = ({
  code = 500,
  message = 'An error occurred'
}) => (
  <>
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold mr-4">{code}</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </>
)