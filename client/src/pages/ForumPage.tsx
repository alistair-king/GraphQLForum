import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form'
import cls from 'classnames'

import { IForum } from '../types'

import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Forum } from '../features/Forum'

import { ErrorPage } from './ErrorPage'

import { useModal } from '../hooks'

const GET_FOURM = gql`
  query getForum($id: String!, $skip: Int!, $take: Int!) {
    forum(id: $id) {
      id
      name
      threads(skip: $skip, take: $take) {
        count,
        items {
          id
          title
          when
          author {
            id
            name
          }
          lastReply {
            count
            reply {
              id
              when
              author {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

const ADD_THREAD = gql`
  mutation AddThread($newThreadData: NewThreadInput!) {
    addThread(newThreadData: $newThreadData) {
      title
      content
    }
  }
`

export const ForumPage: React.FC = () => {
  const { id, pageString } = useParams()
  const page = parseInt(pageString || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/forum/${id}/${newPage}`) }
  
  const { loading, error, data } = useQuery<{forum: IForum}, {id: string, skip: number, take: number}>(
    GET_FOURM,
    {
      variables: {
        id: id as string,
        skip: (page  * 10),
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
    const [addThread] = useMutation(ADD_THREAD)

    const Form: React.FC = () => (
      <>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-title">
              Title
            </label>
            <input
              autoFocus
              name="title"
              id="grid-title"
              ref={register}
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            />
            {errors.title && <span className="text-red-500">Required field!</span>}
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-post">
              Post
            </label>
            <textarea              
              name="content"
              id="grid-reply"
              ref={register}
              className={cls('appearance-none block w-full text-grey-darker border rounded py-3 px-4 mb-3',
                {
                  'bg-grey-lighter border-grey-lighter': !errors.content,
                  'bg-red-200 border-red-500': !!errors.content
                }
              )}               
            />
            {errors.content && <span className="text-red-500">Required field!</span>}
          </div>
        </div>
      </>
    )
    
    const Actions: React.FC = () => (
      <>
        <Button type="submit">Post</Button>
        <Button secondary onClick={() => closeModal()}>Cancel</Button>
      </>
    )
  
    const onSubmit = data => {
      if (data.title && data.content) {
        const newThreadData = {
          forumId: id, 
          authorId: '1',
          title: data.title,
          content: data.content
        }
        addThread({
          variables: {
            newThreadData
          }
        })
        closeModal();
      }
    }
  
    return (
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title="New Thread"
        content={<Form />}
        actions={<Actions />}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button onClick={() => openModal()}>
          New Thread
        </Button>
      </Modal>
    )
  }

  return (
    <Page
      title={data?.forum?.name}
      commands={<Commands />}
      back="/"
    >
      { loading || !data
        ? <Spinner className="w-full flex justify-center pt-8" />
        : <Forum forum={data.forum} page={page} setPage={setPage} />
      }
    </Page>
  )
}
