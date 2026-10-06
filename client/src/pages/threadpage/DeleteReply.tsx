import React from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'

import { PAGE_SIZE } from '../../constants'
import { DELETE_REPLY, GET_FORUM, GET_THREAD } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IReply, IThread } from '../../types'
import { makeThreadUrl } from '../../urls'
import { ActionButton } from '../../components/ActionButton'
import { Modal } from '../../components/Modal'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { useModal } from '../../hooks'

export const DeleteReply: React.FC<{
  reply: IReply
  thread?: IThread,
  label?: string
}> = ({
  reply,
  thread,
  label
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useNavigationState()
  const navigate = useNavigate()
  const {
    forumId,
    forumPage,
    threadId,
    threadPage
  } = useParams()

  const [deleteReply] = useMutation(DELETE_REPLY,
    {
      refetchQueries: [
        {
          query: GET_THREAD,
          variables: state.get(NavType.THREAD)
        },
        {
          query: GET_FORUM,
          variables: state.get(NavType.FORUM)
        }
      ]
    }
  )

  const onDelete = () => {
    deleteReply({
      variables: {
        data: {
          id: reply.id,
        }
      }
    })
    closeModal()
    if ((thread?.replies?.count || 0) % PAGE_SIZE === 1) {
      navigate(makeThreadUrl(forumId, forumPage, threadId, Number(threadPage || '1') - 1))
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<ConfirmDialog title="Delete reply" onDelete={onDelete} closeModal={closeModal} />}
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
