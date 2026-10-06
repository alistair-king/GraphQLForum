import React from 'react'
import { useMutation } from '@apollo/client'

import { ADD_THREAD, GET_FORUM } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IsAuthenticated } from '../../components/auth/IsAuthenticated'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { ModalActions } from '../../components/ModalActions'
import { Thread, ThreadFormValues } from '../../forms/Thread'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useNavigationState()

  const [addThread] = useMutation(ADD_THREAD,
    {
      refetchQueries: [
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    }
  )

  const onSubmit = (data: ThreadFormValues) => {
    if (data.title && data.content) {
      addThread({
        variables: {
          newThreadData: {
            forumId: state.get(NavType.FORUM).id,
            title: data.title,
            content: data.content
          }
        }
      })
      closeModal()
    }
  }

  return (
    <IsAuthenticated>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={<Thread title="New Thread" actions={<ModalActions closeModal={closeModal} submitLabel="Post" />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal}>
          New Thread
        </Button>
      </Modal>
    </IsAuthenticated>
  )
}
