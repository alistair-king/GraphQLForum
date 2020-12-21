import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IThread } from '../../types'

import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'

import { Thread } from '../../features/Thread'

import { ErrorPage } from '../ErrorPage'

import { Commands } from './Commands'

const GET_THREAD = gql`
  query getForum($id: String!, $page: Int!) {
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
      replies(page: $page) {
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

export const ThreadPage: React.FC = () => {
  const { id, pageString } = useParams()
  const page = parseInt(pageString || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/thread/${id}/${newPage}`) }

  const { loading, error, data } = useQuery<{thread: IThread}, {id: string, page: number}>(
    GET_THREAD,
    {
      variables: {
        id,
        page
      }
    }
  )

  if ( error ) {
    return <ErrorPage message={error?.message} />
  }

  return (
    <>
      <Page
        title={`${data?.thread?.title}`}
        commands={<Commands id={id} />}
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