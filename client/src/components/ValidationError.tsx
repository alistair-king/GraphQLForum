import React from 'react'
import { FieldError } from 'react-hook-form'

export const ValidationError:React.FC<{
  error?: FieldError
}> = ({
  error
}) => (
  <>
    {error && <span className="text-red-500">An error occurred</span>}
  </>
)