import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { GET_THREAD } from '../../gql'
import { useNavigationState, NavType } from '../../state'
import { IThread } from '../../types'
import { makeForumUrl, makeThreadUrl } from '../../urls'
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
  const setPage = (newPage: number) =>
    history.push(makeThreadUrl(forumId, forumPage, threadId, newPage))
  const state = useNavigationState()

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
      state.set(NavType.THREAD, threadId, page)
      if (state.get(NavType.FORUM).id === '') {
        state.set(NavType.FORUM, data?.thread?.forum?.id || '', 0)
      }
    }
  }, [data, state, threadId, page])

  if ( error ) {
    return <ErrorPage message={error?.message} />
  }

  return (
    <>
      <Page
        title={`${data?.thread?.title}`}
        commands={<Commands thread={data?.thread} />}
        back={makeForumUrl(forumId, forumPage)}
      >
        { loading || !data
          ? <Spinner className="w-full flex justify-center pt-8" />
          : <Thread thread={data.thread} page={page} setPage={setPage}/>
        }
      </Page>
    </>
  )
}