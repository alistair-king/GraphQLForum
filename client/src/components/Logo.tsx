import React from 'react'

import logo from '../assets/logo.svg'

export const Logo: React.FC<{
  className?: string
}> = ({
  className
}) => (
  <a href="/" className={className}>
    <img src={logo} alt="" />
  </a>
)
