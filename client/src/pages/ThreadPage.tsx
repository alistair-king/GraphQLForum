import React from 'react'
import { useParams } from 'react-router-dom' // useHistory, 

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IThread } from '../types'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Thread } from '../features/Thread'
import { NewReply } from '../features/NewReply'

import { ErrorPage } from './ErrorPage'

import { useModal } from '../hooks'

const GET_THREAD = gql`
  query getForum($id: String!, $skip: Int!, $take: Int!) {
    thread(id: $id) {
      id
      title
      content
      when
      forum {
        id
        name
      }
      author {
        id
        name
      }
      replies(skip: $skip, take: $take) {
        count,
        items {
          id
          when
          content
        }
      }
    }
  }
`;

export const ThreadPage: React.FC = () => {
  const { id } = useParams() // , pageString
  // const page = parseInt(pageString || '0')
  // const history = useHistory()
  // const setPage = (newPage: number) => { history.push(`/thread/${id}/${newPage}`) }

  const { loading, error, data } = useQuery<{thread: IThread}, {id: string, skip: number, take: number}>(
    GET_THREAD,
    {
      variables: {
        id: id as string,
        skip: 0,
        take: 10
      }
    }
  )

  if ( error ) {
    return <ErrorPage message={error?.message} />
  }

  return (
    <>
      <Page
        title={`${data?.thread?.forum?.name} > ${data?.thread?.title}`}
        commands={<Commands />}
        back={`/forum/${data?.thread?.forum?.id}`}
      >
        { loading || !data
          ? <Spinner className="w-full flex justify-center pt-8" />
          : <Thread thread={data.thread}/>
        }
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
    <Modal isOpen={isOpen} closeModal={closeModal} title="Reply" content={<NewReply />} actions={<Actions />}>
      <Button onClick={() => openModal()}>
        Reply
      </Button>
    </Modal>
  )
}

