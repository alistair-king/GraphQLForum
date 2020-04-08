import React from 'react'

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IForum } from '../types'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Forum } from '../features/Forum'
import { NewPost } from '../features/NewPost'

import { useModal } from '../hooks'


interface DataForum {
  forum: IForum;
}

interface DataForumVars {
  id: string;
}

const GET_FOURM = gql`
  query getForum($id: String!) {
    forum(id: $id) {
      id
      name
      threads {
        id
        title
        when
        author {
          id
          name
        }
      }
    }
  }
`;

export const ForumPage: React.FC = () => {

  const { loading, error, data } = useQuery<DataForum, DataForumVars>(
    GET_FOURM,
    { variables: { id: '1' } }
  );
  
  if ( loading ) { return <Spinner /> }
  if ( error || !data ) { return <p>Error! : {error}</p> }
  
  const { forum } = data
  
  return (
    <>
      <Page title={forum.name} commands={<Commands />}>
        <Forum forum={forum} />
      </Page>
    </>
  )
}

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

