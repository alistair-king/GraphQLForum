import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { MdDelete } from 'react-icons/md'

import { IThread } from '../types'
import { ActionButton } from '../components/ActionButton'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { useModal } from '../hooks'

const DELETE_THREAD = gql`
  mutation DeleteThread($deleteThreadData: DeleteThreadInput!) {
    deleteThread(DeleteThreadInput: $deleteThreadData) {
      id
      title
      content
    }
  }
`

export const DeleteThread: React.FC<{ thread: IThread }> = ({ thread }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [deleteThread] = useMutation(DELETE_THREAD)
  const history = useHistory();

  const Confirmation = () => (
    <>
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        Delete thread
      </div>
      <div className="px-6 py-3">
        <div className="-mx-3 md:flex">
          <p>Are you sure?</p>
        </div>
      </div>
      <div className="flex justify-end px-6 py-3 border-t border-gray-200 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <Button onClick={onDelete}>Delete</Button>
        <Button secondary onClick={closeModal}>Cancel</Button>
      </div>
    </>
  )

  const onDelete = () => {
    const deleteThreadData = {
      id: parseInt(thread.id), 
    }
    deleteThread({
      variables: {
        deleteThreadData
      }
    })
    closeModal();
    history.goBack();
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Confirmation />}
    >
      <ActionButton warning tooltip="Delete" onClick={openModal}>
        <MdDelete />
      </ActionButton>
    </Modal>
  )
}
