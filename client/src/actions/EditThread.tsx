import React from 'react'
import { useMutation } from '@apollo/client'
import { MdEdit } from 'react-icons/md'

import { UPDATE_THREAD, GET_FORUM } from '../gql'
import { IThread } from '../types'
import { useNavigationState, NavType } from '../state'
import { ActionButton } from '../components/ActionButton'
import { Modal } from '../components/Modal'
import { ModalActions } from '../components/ModalActions'
import { Thread, ThreadFormValues } from '../forms/Thread'
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
  
  const onSubmit = (data: ThreadFormValues) => {
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
      content={<Thread thread={thread} title="Edit Thread" actions={<ModalActions closeModal={closeModal} submitLabel="Update" />} onSubmit={onSubmit} />}
    >
      <ActionButton tooltip="Edit" onClick={openModal}>
        <MdEdit />
      </ActionButton>
    </Modal>
  )
}
