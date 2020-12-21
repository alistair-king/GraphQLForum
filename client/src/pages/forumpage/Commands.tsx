import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Thread } from '../../forms/Thread'
import { useModal } from '../../hooks'

import { GET_FORUM } from '.'

const ADD_THREAD = gql`
  mutation AddThread($newThreadData: NewThreadInput!) {
    addThread(newThreadData: $newThreadData) {
      title
      content
    }
  }
`

export const Commands: React.FC<{
  id: string,
  page: number
}> = ({
  id,
  page
}) => {
  const { isOpen, openModal, closeModal } = useModal()
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
      content={<Thread title="New Thread" actions={<Actions />} onSubmit={onSubmit} />}
    >
      <Button onClick={openModal}>
        New Thread
      </Button>
    </Modal>
  )
}
