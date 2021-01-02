import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { MdDelete } from 'react-icons/md'

import { DELETE_REPLY, GET_FORUM, GET_THREAD } from '../../gql'
import { useAppState } from '../../state'
import { IReply } from '../../types'
import { ActionButton } from '../../components/ActionButton'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { useModal } from '../../hooks'


export const DeleteReply: React.FC<{
  reply: IReply
  label?: string
}> = ({
  reply,
  label
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useAppState()
  const [deleteReply] = useMutation(DELETE_REPLY,
    {
      refetchQueries:[
        {
          query: GET_THREAD,
          variables: state.getNavigation('THREAD')
        },
        {
          query: GET_FORUM,
          variables: state.getNavigation('FORUM')
        }
      ]
    })

  const Confirmation = () => (
    <>
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        Delete reply
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
    deleteReply({
      variables: {
        deleteReplyData: {
          id: reply.id,
        }
      }
    })
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Confirmation />}
    >
      <ActionButton warning onClick={openModal}>
        <MdDelete />
      </ActionButton>
      {label && <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={openModal}>
        {label}
      </span>}
    </Modal>
  )
}
