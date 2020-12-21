import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import { GET_THREAD } from '../../gql'
import { StateContext } from '../../state'
import { IThread } from '../../types'
import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'
import { Thread } from '../../features/Thread'
import { ErrorPage } from '../ErrorPage'
import { Commands } from './Commands'

export const ThreadPage: React.FC = () => {
  const { id, pageString } = useParams()
  const page = parseInt(pageString || '0')
  const history = useHistory()
  const setPage = (newPage: number) => { history.push(`/thread/${id}/${newPage}`) }
  const state = useContext(StateContext);

  const { loading, error, data } = useQuery<{thread: IThread}, {id: string, page: number}>(
    GET_THREAD,
    {
      variables: {
        id,
        page
      }
    }
  )

  useEffect(() => {
    if (data) {
      state.set('THREAD', id, page);
    }
  }, [data, state, id, page]);

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