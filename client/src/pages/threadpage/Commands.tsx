import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { ADD_REPLY, GET_THREAD, GET_FORUM } from '../../gql'
import { useAppState } from '../../state'
import { IsAuthenticated } from '../../components/auth/IsAuthenticated'
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
  const state = useAppState()

  const [addReply] = useMutation(ADD_REPLY,
    {
      refetchQueries:[
        {
          query: GET_THREAD,
          variables: state.getNavigation('FORUM')
        },
        {
          query: GET_FORUM,
          variables: state.getNavigation('THREAD')
        }        
      ]
    })
  
  const onSubmit = data => {
    if (data.content) {
      addReply({
        variables: {
          newReplyData: {
            threadId: id, 
            authorId: state.getUser()?.id,
            content: data.content
          }
        }
      })
      closeModal()
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
        content={<Reply title="Reply" actions={<Actions />} onSubmit={onSubmit}/>}
      >
        <Button onClick={openModal}>
          Reply
        </Button>
      </Modal>
    </IsAuthenticated>
  )
}

