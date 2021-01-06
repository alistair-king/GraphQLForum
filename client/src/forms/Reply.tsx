import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { IReply } from '../types'
import { TextEditor } from '../components/TextEditor'
import { ValidationError } from '../components/ValidationError'

export const Reply: React.FC<{
  reply?: IReply,
  title: string,
  actions: ReactNode,
  onSubmit: any
}> = ({
  reply,
  title,
  actions,
  onSubmit
}) => {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      content: reply?.content || '',
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </div>

      <div className="px-6 py-3 overflow-y-auto" style={{maxHeight: '80vh'}}>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <TextEditor name="content" control={control} />
            <ValidationError error={errors.content} />
          </div>
        </div>
      </div>

      <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {actions}
      </div>
    </form>
  )
}
