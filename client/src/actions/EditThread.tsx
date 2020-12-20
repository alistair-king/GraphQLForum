import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { MdEdit } from 'react-icons/md'

import { IThread } from '../types'
import { ActionButton } from '../components/ActionButton'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Thread } from '../forms/Thread'
import { useModal } from '../hooks'

const UPDATE_THREAD = gql`
  mutation UpdateThread($updateThreadData: UpdateThreadInput!) {
    updateThread(updateThreadData: $updateThreadData) {
      id
      title
      content
    }
  }
`

export const EditThread: React.FC<{ thread: IThread }> = ({ thread }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [updateThread] = useMutation(UPDATE_THREAD)
  
  const Actions = () => (
    <>
      <Button type="submit">Update</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.title && data.content) {
      const updateThreadData = {
        id: parseInt(thread.id), 
        title: data.title,
        content: data.content
      }
      updateThread({
        variables: {
          updateThreadData
        }
      })
      closeModal();
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
