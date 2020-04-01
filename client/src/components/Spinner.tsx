import React from 'react'

import GridLoader from "react-spinners/GridLoader"

export const Spinner: React.FC<{
  size?: number
  color?: string,
  className?: string
}> = ({
  size = 16,
  color = '#a0aec0',
  className
}) => (
  <div className={className}>
    <GridLoader size={size} color={color} loading />
  </div>
)
