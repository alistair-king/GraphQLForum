import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { ADD_THREAD, GET_FORUM } from '../../gql'
import { useAuthState, useNavigationState, NavType } from '../../state'
import { IsAuthenticated } from '../../components/auth/IsAuthenticated'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Thread } from '../../forms/Thread'
import { useModal } from '../../hooks'

export const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const { getUser } = useAuthState()
  const state = useNavigationState()

  const [addThread] = useMutation(ADD_THREAD,
    {
      refetchQueries:[
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    }
  )

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
            forumId: state.get(NavType.FORUM).id, 
            authorId: getUser()?.id,
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
        content={<Thread title="New Thread" actions={<Actions />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal}>
          New Thread
        </Button>
      </Modal>
    </IsAuthenticated>
  )
}
