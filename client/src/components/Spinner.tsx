import React from 'react'

import GridLoader from "react-spinners/GridLoader"

const Spinner: React.FC<{
  size?: number
  color?: string
}> = ({
  size = 16,
  color = '#a0aec0'
}) => (
  <GridLoader size={size} color={color} loading />
)
