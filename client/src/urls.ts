export const HOME = '/'
export const POST_AUTH0_CALLBACK = '/auth0_callback'
export const POST_LOGOUT_CALLBACK = '/loggedout_callback'

export const FORUM_PAGE1 = '/:forumId/:forumPage'
export const FORUM_PAGE2 = '/:forumId'
export const makeForumUrl = (forumId?: string | number, forumPage?: string | number) =>
  forumId !== undefined && forumPage !== undefined && forumPage !== 0 && forumPage !== '0'
    ? `/${forumId}/${forumPage}`
    : `/${forumId ?? ''}`

export const THREAD_PAGE1 = '/:forumId/:forumPage/:threadId/:threadPage'
export const THREAD_PAGE2 = '/:forumId/:forumPage/:threadId'
export const makeThreadUrl = (
  forumId?: string | number,
  forumPage?: string | number,
  threadId?: string | number,
  threadPage?: string | number
) =>
  threadId !== undefined && threadPage !== undefined && threadPage !== 0 && threadPage !== '0'
    ? `/${forumId ?? ''}/${forumPage ?? 0}/${threadId}/${threadPage}`
    : `/${forumId ?? ''}/${forumPage ?? 0}/${threadId ?? ''}`
