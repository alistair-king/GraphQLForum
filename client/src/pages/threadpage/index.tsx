import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import { GET_THREAD } from '../../gql'
import { useAppState } from '../../state'
import { IThread } from '../../types'
import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'
import { Thread } from '../../features/Thread'
import { ErrorPage } from '../ErrorPage'
import { Commands } from './Commands'

export const ThreadPage: React.FC = () => {
  const {
    forumId,
    forumPage,
    threadId,
    threadPage
  } = useParams()
  const page = parseInt(threadPage || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/${forumId}/${forumPage}/${threadId}/${newPage}`) }
  const state = useAppState()

  const { loading, error, data } = useQuery<{thread: IThread}, {id: string, page: number}>(
    GET_THREAD,
    {
      variables: {
        id: threadId,
        page
      }
    }
  )

  useEffect(() => {
    if (data) {
      state.setNavigation('THREAD', threadId, page);
      if (state.getNavigation('FORUM').id === '') {
        state.setNavigation('FORUM', data?.thread?.forum?.id || '', 0);
      }
    }
  }, [data, state, threadId, page]);

  if ( error ) {
    return <ErrorPage message={error?.message} />
  }

  return (
    <>
      <Page
        title={`${data?.thread?.title}`}
        commands={<Commands id={threadId} />}
        back={`/${forumId}/${forumPage}`}
      >
        { loading || !data
          ? <Spinner className="w-full flex justify-center pt-8" />
          : <Thread thread={data.thread} page={page} setPage={setPage}/>
        }
      </Page>
    </>
  )
}