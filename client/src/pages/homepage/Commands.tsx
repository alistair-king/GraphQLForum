import React from 'react'
import { useMutation } from '@apollo/client'

import { ADD_FORUM, GET_FORUMS } from '../../gql'
import { IsAdmin } from '../../components/auth/IsAdmin'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { ModalActions } from '../../components/ModalActions'
import { Forum, ForumFormValues } from '../../forms/Forum'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [addForum] = useMutation(ADD_FORUM,
    {
      refetchQueries: [
        {
          query: GET_FORUMS
        }
      ]
    }
  )

  const onSubmit = (data: ForumFormValues) => {
    if (data.name) {
      addForum({
        variables: {
          newForumData: {
            name: data.name,
            description: data.description
          }
        }
      })
      closeModal()
    }
  }

  return (
    <IsAdmin>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={<Forum title="New Forum" actions={<ModalActions closeModal={closeModal} submitLabel="Create" />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal} className="mr-1">
          New Forum
        </Button>
      </Modal>
    </IsAdmin>
  )
}
