import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MdEdit } from 'react-icons/md'

import { UPDATE_REPLY, GET_FORUM, GET_THREAD } from '../gql'
import { IReply } from '../types'
import { StateContext } from '../state'
import { ActionButton } from '../components/ActionButton'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Reply } from '../forms/Reply'
import { useModal } from '../hooks'


export const EditReply: React.FC<{
  reply: IReply
}> = ({
  reply
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useContext(StateContext)
  const {
    id: forumId,
    page: forumPage
  } = state.get('FORUM');
  const {
    id: threadId,
    page: threadPage
  } = state.get('THREAD');
  const [updateReply] = useMutation(UPDATE_REPLY,
    {
      refetchQueries:[
        {
          query: GET_THREAD,
          variables: {
            id: threadId,
            page: threadPage
          }
        },
        {
          query: GET_FORUM,
          variables: {
            id: forumId,
            page: forumPage
          }
        }
      ]
    }
  );
  
  const Actions = () => (
    <>
      <Button type="submit">Update</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  const onSubmit = data => {
    if (data.content) {
      updateReply({
        variables: {
          updateReplyData: {
            id: reply.id, 
            title: data.title,
            content: data.content
          }
        }
      })
      closeModal();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Reply reply={reply} title="Edit Reply" actions={<Actions />} onSubmit={onSubmit} />}
    >
      <ActionButton tooltip="Edit" onClick={openModal}>
        <MdEdit />
      </ActionButton>
    </Modal>
  )
}
