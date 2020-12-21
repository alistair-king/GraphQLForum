import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';

import { ADD_REPLY, GET_THREAD, GET_FORUM } from '../../gql'
import { StateContext } from '../../state'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { Reply } from '../../forms/Reply'
import { useModal } from '../../hooks'

export const Commands: React.FC<{
  id: string
}> = ({
  id
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const state = useContext(StateContext);
  const {
    id: forumId,
    page: forumPage
  } = state.get('FORUM');
  const {
    id: threadId,
    page: threadPage
  } = state.get('THREAD');
  const { userId } = state;
  const [addReply] = useMutation(ADD_REPLY,
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
    })
  
  const onSubmit = data => {
    if (data.content) {
      addReply({
        variables: {
          newReplyData: {
            threadId: id, 
            authorId: userId,
            content: data.content
          }
        }
      })
      closeModal();
    }
  }
  
  const Actions: React.FC = () => (
    <>
      <Button type="submit">Post</Button>
      <Button secondary onClick={closeModal}>Cancel</Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      content={<Reply title="Reply" actions={<Actions />} onSubmit={onSubmit}/>}
    >
      <Button onClick={openModal}>
        Reply
      </Button>
    </Modal>
  )
}

