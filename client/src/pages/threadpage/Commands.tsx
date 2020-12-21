import React from 'react'
import { useMutation } from '@apollo/react-hooks';

import { ADD_REPLY } from '../../gql'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Reply } from '../../forms/Reply'
import { useModal } from '../../hooks'

export const Commands: React.FC<{ id: string }> = ({ id }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [addReply] = useMutation(ADD_REPLY)
  
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
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Reply title="Reply" actions={<Actions />} onSubmit={onSubmit}/>}
    >
      <Button onClick={openModal}>
        Reply
      </Button>
    </Modal>
  )
}

