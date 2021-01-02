import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from 'react-use-auth'

import { ADD_FORUM, GET_FORUMS } from '../../gql'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Forum } from '../../forms/Forum'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { login, logout, isAuthenticated } = useAuth()
  
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
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={<Forum title="New Forum" actions={<Actions />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal} className="mr-1">
          New Forum
        </Button>
      </Modal>
        <Button onClick={isAuthenticated() ? logout : login}>
          {isAuthenticated() ? 'Logout' : 'Login'}
        </Button>
    </>
  )
}
