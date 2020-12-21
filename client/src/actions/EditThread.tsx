import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MdEdit } from 'react-icons/md'

import { UPDATE_THREAD, GET_FORUM } from '../gql'
import { IThread } from '../types'
import { StateContext } from '../state'
import { ActionButton } from '../components/ActionButton'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Thread } from '../forms/Thread'
import { useModal } from '../hooks'


export const EditThread: React.FC<{ thread: IThread }> = ({ thread }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { id, page } = useContext(StateContext).get('FORUM');
  const [updateThread] = useMutation(UPDATE_THREAD,
    {
      refetchQueries:[
        {
          query: GET_FORUM,
          variables: {
            id,
            page
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
