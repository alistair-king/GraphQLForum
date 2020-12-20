import React from 'react'

import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import cls from 'classnames'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { useModal } from '../../hooks'

const ADD_THREAD = gql`
  mutation AddThread($newThreadData: NewThreadInput!) {
    addThread(newThreadData: $newThreadData) {
      title
      content
    }
  }
`

export const Commands: React.FC<{ id: string }> = ({ id }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { register, handleSubmit, errors } = useForm()
  const [addThread] = useMutation(ADD_THREAD)

  const Form: React.FC = () => (
    <>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-title">
            Title
          </label>
          <input
            autoFocus
            name="title"
            id="grid-title"
            ref={register}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          />
          {errors.title && <span className="text-red-500">Required field!</span>}
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-post">
            Post
          </label>
          <textarea              
            name="content"
            id="grid-reply"
            ref={register}
            className={cls('appearance-none block w-full text-grey-darker border rounded py-3 px-4 mb-3',
              {
                'bg-grey-lighter border-grey-lighter': !errors.content,
                'bg-red-200 border-red-500': !!errors.content
              }
            )}               
          />
          {errors.content && <span className="text-red-500">Required field!</span>}
        </div>
      </div>
    </>
  )
  
  const Actions: React.FC = () => (
    <>
      <Button type="submit">Post</Button>
      <Button secondary onClick={() => closeModal()}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.title && data.content) {
      const newThreadData = {
        forumId: id, 
        authorId: '1',
        title: data.title,
        content: data.content
      }
      addThread({
        variables: {
          newThreadData
        }
      })
      closeModal();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="New Thread"
      content={<Form />}
      actions={<Actions />}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button onClick={() => openModal()}>
        New Thread
      </Button>
    </Modal>
  )
}
