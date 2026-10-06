import React, { ReactNode } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IThread } from '../types'
import { TextEditor } from '../components/TextEditor'
import { ValidationError } from '../components/ValidationError'

export interface ThreadFormValues {
  title: string
  content: string
}

export const Thread: React.FC<{
  thread?: IThread,
  title: string,
  actions: ReactNode,
  onSubmit: SubmitHandler<ThreadFormValues>
}> = ({
  thread,
  title,
  actions,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<ThreadFormValues>({
    defaultValues: {
      title: thread?.title || '',
      content: thread?.content || '',
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </div>

      <div className="px-6 py-3 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
              Title
            </label>
            <input
              autoFocus
              id="grid-title"
              {...register('title', { required: true, maxLength: 255 })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3"
            />
            <ValidationError error={errors.title} />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-post">
              Post
            </label>
            <TextEditor name="content" control={control} rules={{ required: true }} />
            <ValidationError error={errors.content} />
          </div>
        </div>
      </div>

      {actions &&
        <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          {actions}
        </div>
      }
    </form>
  )
}
