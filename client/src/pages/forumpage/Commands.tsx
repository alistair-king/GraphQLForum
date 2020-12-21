import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';

import { ADD_THREAD, GET_FORUM } from '../../gql'
import { StateContext } from '../../state'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Thread } from '../../forms/Thread'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const { id, page } = useContext(StateContext).get('FORUM');
  const [addThread] = useMutation(ADD_THREAD,
    {
      refetchQueries:[
        {
          query: GET_FORUM,
          variables: {
            id,
            page
          }
        }
      ]
    }
  );

  const Actions: React.FC = () => (
    <>
      <Button type="submit">Post</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.title && data.content) {
      addThread({
        variables: {
          newThreadData: {
            forumId: id, 
            authorId: '1',
            title: data.title,
            content: data.content
          }
        }
      })
      closeModal();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Thread title="New Thread" actions={<Actions />} onSubmit={onSubmit} />}
    >
      <Button onClick={openModal}>
        New Thread
      </Button>
    </Modal>
  )
}
