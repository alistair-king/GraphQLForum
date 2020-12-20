import React from 'react'

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from 'react-hook-form'
import cls from 'classnames'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { useModal } from '../../hooks'

const ADD_REPLY = gql`
  mutation AddReply($newReplyData: NewReplyInput!) {
    addReply(newReplyData: $newReplyData) {
      content
    }
  }
`

export const Commands: React.FC<{ id: string }> = ({ id }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { register, handleSubmit, errors } = useForm()
  const [addReply] = useMutation(ADD_REPLY)
  
  const Form: React.FC = () => {
    return (
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <textarea
            autoFocus
            name="content"
            id="grid-reply"
            ref={register({ required: true })}
            className={cls('appearance-none block w-full text-grey-darker border rounded py-3 px-4 mb-3',
              {
                'bg-grey-lighter border-grey-lighter': !errors.content,
                'bg-red-200 border-red-500': !!errors.content
              }
            )} />
          {errors.content && <span className="text-red-500">Required field!</span>}
        </div>
      </div>
    )
  }

  const onSubmit = data => {
    if (data.content) {
      const newReplyData = {
        threadId: id, 
        authorId: '1',
        content: data.content
      }
      addReply({
        variables: {
          newReplyData
        }
      })
      closeModal();
    }
  }
  
  const Actions: React.FC = () => (
    <>
      <Button type="submit">Post</Button>
      <Button secondary onClick={() => closeModal()}>Cancel</Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Reply"
      content={<Form />}
      actions={<Actions />}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button onClick={() => openModal()}>
        Reply
      </Button>
    </Modal>
  )
}

