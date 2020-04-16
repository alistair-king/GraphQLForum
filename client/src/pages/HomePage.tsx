import React from 'react'

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { IForum } from '../types'

import { Page } from '../components/Page'
import { Spinner } from '../components/Spinner'

import { Home } from '../features/Home'

import { ErrorPage } from './ErrorPage'


const GET_FORUMS = gql`
  query getForums {
    forums {
      id
      name
      description
    }
  }
`;


export const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery<{forums: IForum[]}>(
    GET_FORUMS,
    {}
  )
  
  if ( error ) {
    return <ErrorPage message={error?.message} />
  }
  
  return (
    <Page title="Discussions">
      { loading || !data
        ? <Spinner className="w-full flex justify-center pt-8" />
        : <Home forums={data.forums} />
      }
    </Page>
  )
}

