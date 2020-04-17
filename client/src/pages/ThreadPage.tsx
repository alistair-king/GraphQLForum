import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form'
import cls from 'classnames'

import { IThread } from '../types'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Thread } from '../features/Thread'

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
          author {
            id
            name
          }          
        }
      }
    }
  }
`

const ADD_REPLY = gql`
  mutation AddReply($newReplyData: NewReplyInput!) {
    addReply(newReplyData: $newReplyData) {
      content
    }
  }
`


export const ThreadPage: React.FC = () => {
  const { id, pageString } = useParams()
  const page = parseInt(pageString || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/thread/${id}/${newPage}`) }

  const { loading, error, data } = useQuery<{thread: IThread}, {id: string, skip: number, take: number}>(
    GET_THREAD,
    {
      variables: {
        id: id as string,
        skip: (page * 10),
        take: 10
      }
    }
  )

  if ( error ) {
    return <ErrorPage message={error?.message} />
  }

  const Commands: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal()
    const { register, handleSubmit, errors } = useForm()
    const [addReply] = useMutation(ADD_REPLY)
    
    const Form: React.FC = () => {
      return (
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <textarea
              autoFocus
              name="content"
              id="grid-reply"
              ref={register({ required: true })}
              className={cls('appearance-none block w-full text-grey-darker border rounded py-3 px-4 mb-3',
                {
                  'bg-grey-lighter border-grey-lighter': !errors.content,
                  'bg-red-200 border-red-500': !!errors.content
                }
              )} />
            {errors.content && <span className="text-red-500">Required field!</span>}
          </div>
        </div>
      )
    }

    const onSubmit = data => {
      if (data.content) {
        const newReplyData = {
          threadId: id, 
          authorId: '1',
          content: data.content
        }
        addReply({
          variables: {
            newReplyData
          }
        })
        closeModal();
      }
    }
    
    const Actions: React.FC = () => (
      <>
        <Button type="submit">Post</Button>
        <Button secondary onClick={() => closeModal()}>Cancel</Button>
      </>
    )
  
    return (
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="Reply"
        content={<Form />}
        actions={<Actions />}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button onClick={() => openModal()}>
          Reply
        </Button>
      </Modal>
    )
  }

  return (
    <>
      <Page
        title={`${data?.thread?.title}`}
        commands={<Commands />}
        back={`/forum/${data?.thread?.forum?.id}`}
      >
        { loading || !data
          ? <Spinner className="w-full flex justify-center pt-8" />
          : <Thread thread={data.thread} page={page} setPage={setPage}/>
        }
      </Page>
    </>
  )
}