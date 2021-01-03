import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { GET_FORUMS } from '../../gql'
import { IForum } from '../../types'
import { Page } from '../../components/Page'
import { Spinner } from '../../components/Spinner'
import { Home } from '../../features/Home'
import { ErrorPage } from '../ErrorPage'
import { Commands } from './Commands'

export const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery<{forums: IForum[]}>(
    GET_FORUMS,
    {}
  )
  
  if ( error ) {
    return <ErrorPage message={error?.message} />
  }
  
  return (
    <Page
      title="Discussions"
      commands={<Commands />}
    >
      { loading || !data
        ? <Spinner className="w-full flex justify-center pt-8" />
        : <Home forums={data.forums} />
      }
    </Page>
  )
}

