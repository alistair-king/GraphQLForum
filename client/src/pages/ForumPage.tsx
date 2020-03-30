import React from 'react'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'

import { Forum } from '../features/Forum'
import { NewPost } from '../features/NewPost'

import { useModal } from '../hooks'

export const ForumPage: React.FC = () => (
  <>
    <Page title="Open Discussion" commands={<Commands />}>
      <Forum />
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
    <Modal isOpen={isOpen} closeModal={closeModal} title="New Thread" content={<NewPost />} actions={<Actions />}>
      <Button onClick={() => openModal()}>
        New Thread
      </Button>
    </Modal>
  )
}

