import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const LinkButton: React.FC<{
  children: ReactNode,
  to: string
}> = ({
  children,
  to
}) => (
  <Link to={to} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {children}
  </Link>
)
