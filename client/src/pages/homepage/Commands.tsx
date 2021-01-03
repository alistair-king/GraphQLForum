import React from 'react'
import { useMutation } from '@apollo/react-hooks';

import { ADD_FORUM, GET_FORUMS } from '../../gql'
import { IsAdmin } from '../../components/auth/IsAdmin'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Forum } from '../../forms/Forum'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [addForum] = useMutation(ADD_FORUM,
    {
      refetchQueries:[
        {
          query: GET_FORUMS
        }
      ]
    }
  );

  const Actions: React.FC = () => (
    <>
      <Button type="submit">Create</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.name) {
      addForum({
        variables: {
          newForumData: {
            name: data.name,
            description: data.description
          }
        }
      })
      closeModal();
    }
  }

  return (
    <IsAdmin>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={<Forum title="New Forum" actions={<Actions />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal} className="mr-1">
          New Forum
        </Button>
      </Modal>
    </IsAdmin>
  )
}
