import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MdEdit } from 'react-icons/md'

import { UPDATE_THREAD, GET_FORUM } from '../gql'
import { IThread } from '../types'
import { useNavigationState, NavType } from '../state'
import { ActionButton } from '../components/ActionButton'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Thread } from '../forms/Thread'
import { useModal } from '../hooks'

export const EditThread: React.FC<{ thread: IThread }> = ({ thread }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useNavigationState()
  const [updateThread] = useMutation(UPDATE_THREAD,
    {
      refetchQueries:[
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    }
  )
  
  const Actions = () => (
    <>
      <Button type="submit">Update</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.title && data.content) {
      const updateThreadData = {
        id: thread.id, 
        title: data.title,
        content: data.content
      }
      updateThread({
        variables: {
          updateThreadData
        }
      })
      closeModal()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Thread thread={thread} title="Edit Thread" actions={<Actions />} onSubmit={onSubmit} />}
    >
      <ActionButton tooltip="Edit" onClick={openModal}>
        <MdEdit />
      </ActionButton>
    </Modal>
  )
}
