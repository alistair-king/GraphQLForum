import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import { GET_FORUM } from '../../gql'
import { StateContext } from '../../state'
import { IForum } from '../../types'
import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'
import { Forum } from '../../features/Forum'
import { ErrorPage } from '../ErrorPage'
import { Commands } from './Commands';

export const ForumPage: React.FC = () => {
  const { forumId, forumPage = '0'} = useParams()
  const page = parseInt(forumPage)
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`${forumId}/${newPage}`) }
  const state = useContext(StateContext);

  const { loading, error, data } = useQuery<{forum: IForum}, {id: string, page: number}>(
    GET_FORUM,
    {
      variables: {
        id: forumId,
        page
      }
    }
  )

  useEffect(() => {
    if (data) {
      state.set('FORUM', forumId, page);
    }
  }, [data, state, forumId, page]);

  if ( error ) {
    return <ErrorPage message={error?.message} />
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
