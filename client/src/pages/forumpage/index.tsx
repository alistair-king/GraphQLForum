import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IForum } from '../../types'

import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'

import { Forum } from '../../features/Forum'

import { ErrorPage } from '../ErrorPage'

import { Commands } from './Commands';

export const GET_FORUM = gql`
  query getForum($id: String!, $page: Int!) {
    forum(id: $id) {
      id
      name
      threads(page: $page) {
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

export const ForumPage: React.FC = () => {
  const { id, pageString } = useParams()
  const page = parseInt(pageString || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/forum/${id}/${newPage}`) }
  
  const { loading, error, data } = useQuery<{forum: IForum}, {id: string, page: number}>(
    GET_FORUM,
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
    <Page
      title={data?.forum?.name}
      commands={<Commands id={id} page={page} />}
      back="/"
    >
      { loading || !data
        ? <Spinner className="w-full flex justify-center pt-8" />
        : <Forum forum={data.forum} page={page} setPage={setPage} />
      }
    </Page>
  )
}
