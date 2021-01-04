import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MdDelete } from 'react-icons/md'

import { DELETE_THREAD, GET_FORUM } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IThread } from '../../types'
import { ActionButton } from '../../components/ActionButton'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
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
      refetchQueries:[
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    })

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
    deleteThread({
      variables: {
        deleteThreadData: {
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
      content={<Confirmation />}
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
