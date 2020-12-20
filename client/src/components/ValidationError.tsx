import React from 'react'

export const ValidationError:React.FC<{
  error: string
}> = ({
  error
}) => (
  <>
    {error && <span className="text-red-500">{error}</span>}
  </>
)