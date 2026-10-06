import React from 'react'
import { useMutation } from '@apollo/client'
import { MdDelete } from 'react-icons/md'

import { DELETE_THREAD, GET_FORUM } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IThread } from '../../types'
import { ActionButton } from '../../components/ActionButton'
import { Modal } from '../../components/Modal'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { useModal } from '../../hooks'

export const DeleteThread: React.FC<{
  thread: IThread
  label?: string
}> = ({
  thread,
  label
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useNavigationState()
  const [deleteThread] = useMutation(DELETE_THREAD,
    {
      refetchQueries: [
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    })

  const onDelete = () => {
    deleteThread({
      variables: {
        data: {
          id: thread.id
        }
      }
    })
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<ConfirmDialog title="Delete thread" onDelete={onDelete} closeModal={closeModal} />}
    >
      <div onClick={openModal} className="flex">
        <ActionButton warning>
          <MdDelete />
        </ActionButton>
        {label && <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          {label}
        </span>}
      </div>
    </Modal>
  )
}
