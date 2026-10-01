import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import cls from 'classnames'

import { IForum } from '../types'
import { ValidationError } from '../components/ValidationError'

export const Forum: React.FC<{
  forum?: IForum,
  title: string,
  actions: ReactNode,
  onSubmit: any
}> = ({
  forum,
  title,
  actions,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: forum?.name || '',
      description: forum?.description || '',
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
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
              Name
            </label>
            <input
              autoFocus
              id="grid-name"
              {...register('name', { required: true, maxLength: 255 })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3"
            />
            <ValidationError error={errors.name} />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-post">
              Description
            </label>
            <textarea
              id="grid-reply"
              {...register('description', { maxLength: 65535 })}
              className={cls('appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3',
                {
                  'bg-gray-100 border-gray-200': !errors.description,
                  'bg-red-200 border-red-500': !!errors.description
                }
              )}
            />
            <ValidationError error={errors.description} />
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
