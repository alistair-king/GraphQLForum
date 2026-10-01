import React from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { ADD_REPLY, GET_THREAD, GET_FORUM } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IThread } from '../../types'
import { makeThreadUrl } from '../../urls'
import { IsAuthenticated } from '../../components/auth/IsAuthenticated'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Reply } from '../../forms/Reply'
import { useModal } from '../../hooks'

export const Commands: React.FC<{
  thread?: IThread
}> = ({
  thread
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

  const [addReply] = useMutation(ADD_REPLY,
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

  const countReplies = thread?.replies?.count || 0

  const onSubmit = (data: { content: string }) => {
    if (data.content) {
      addReply({
        variables: {
          newReplyData: {
            threadId: thread?.id,
            content: data.content
          }
        }
      })
      closeModal()
      if (countReplies > 0 && countReplies % PAGE_SIZE === 0) {
        navigate(makeThreadUrl(forumId, forumPage, threadId, Number(threadPage || '0') + 1))
      }
    }
  }

  const Actions: React.FC = () => (
    <>
      <Button type="submit">Post</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  return (
    <IsAuthenticated>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={<Reply title="Reply" actions={<Actions />} onSubmit={onSubmit} />}
      >
        <Button onClick={openModal}>
          Reply
        </Button>
      </Modal>
    </IsAuthenticated>
  )
}
