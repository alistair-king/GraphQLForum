import gql from 'graphql-tag'

export const GET_FORUMS = gql`
  query getForums {
    forums {
      id
      name
      description
    }
  }
`;

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

export const ADD_THREAD = gql`
  mutation AddThread($newThreadData: NewThreadInput!) {
    addThread(newThreadData: $newThreadData) {
      title
      content
    }
  }
`

export const UPDATE_THREAD = gql`
  mutation UpdateThread($updateThreadData: UpdateThreadInput!) {
    updateThread(updateThreadData: $updateThreadData) {
      id
      title
      content
    }
  }
`
export const GET_THREAD = gql`
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

export const DELETE_THREAD = gql`
  mutation DeleteThread($deleteThreadData: DeleteThreadInput!) {
    deleteThread(DeleteThreadInput: $deleteThreadData) {
      id
      title
      content
    }
  }
`

export const ADD_REPLY = gql`
  mutation AddReply($newReplyData: NewReplyInput!) {
    addReply(newReplyData: $newReplyData) {
      content
    }
  }
`

