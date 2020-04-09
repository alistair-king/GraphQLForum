import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IForum } from '../types'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Forum } from '../features/Forum'
import { NewPost } from '../features/NewPost'

import { ErrorPage } from './ErrorPage'

import { useModal } from '../hooks'

const GET_FOURM = gql`
  query getForum($id: String!, $skip: Int!) {
    forum(id: $id) {
      id
      name
      threads(skip: $skip) {
        count,
        items {
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
  }
`;


export const ForumPage: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0)
  const { loading, error, data } = useQuery<{forum: IForum}, {id: string, skip: number}>(
    GET_FOURM,
    {
      variables: {
        id: id as string,
        skip: (page  * 10)
      }
    }
  )
  
  if ( error ) {
    return <ErrorPage message={error?.message} />
  }
  
  return (
    <Page title={data?.forum?.name} commands={<Commands />}>
      { loading || !data
        ? <Spinner className="w-full flex justify-center pt-8" />
        : <Forum forum={data.forum} page={page} setPage={setPage} />
      }
    </Page>
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

