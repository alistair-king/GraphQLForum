import React, { ReactNode } from 'react'
import { useForm, Controller } from 'react-hook-form'
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useAuth } from 'react-use-auth'

import { IReply } from '../types'
import { ValidationError } from '../components/ValidationError'
import { getEditorConfig } from '../helpers/froala'

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

  const { isAuthenticated } = useAuth()
  const config = getEditorConfig(isAuthenticated('adminstrator'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </div>

      <div className="px-6 py-3 overflow-y-auto" style={{maxHeight: '80vh'}}>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
          <Controller
              control={control}
              name="content"
              render={({ onChange, onBlur, value }) => (
                <FroalaEditorComponent
                  model={value}
                  onModelChange={onChange}
                  config={config}
                />
              )} />
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

/*
  className={cls('appearance-none block w-full text-grey-darker border rounded py-3 px-4 mb-3',
    {
      'bg-grey-lighter border-grey-lighter': !errors.content,
      'bg-red-200 border-red-500': !!errors.content
    }
  )} 
*/