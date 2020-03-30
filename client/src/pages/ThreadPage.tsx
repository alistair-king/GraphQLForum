import React from 'react'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'

import { Thread } from '../features/Thread'
import { NewReply } from '../features/NewReply'

import { useModal } from '../hooks'

export const ThreadPage: React.FC = () => (
  <>
    <Page
      title="12,000km for the Heart Foundation"
      commands={<Commands />}
      back="/forum"
    >
      <Thread />
    </Page>
  </>
)

const Commands: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
    
  const Actions: React.FC = () => (
    <>
      <Button>Post</Button>
      <Button secondary onClick={() => closeModal()}>Cancel</Button>
    </>
  )
  
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Reply" content={<NewReply />} actions={<Actions />}>
      <Button onClick={() => openModal()}>
        Reply
      </Button>
    </Modal>
  )
}

