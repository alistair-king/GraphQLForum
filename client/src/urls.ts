export const HOME = '/'
export const LOGOUT = '/logout'
export const POST_AUTH0_CALLBACK = '/auth0_callback'
export const POST_LOGIN_CALLBACK = '/loggedin_callback'

export const FORUM_PAGE1 = '/:forumId/:forumPage'
export const FORUM_PAGE2 = '/:forumId'
export const makeForumUrl = (forumId: string, forumPage?: string | number) =>
  forumPage && forumPage !== '0'
    ? `/${forumId}/${forumPage}`
    : `/${forumId}`

export const THREAD_PAGE1 = '/:forumId/:forumPage/:threadId/:threadPage'
export const THREAD_PAGE2 = '/:forumId/:forumPage/:threadId'
export const makeThreadUrl = (
  forumId: string,
  forumPage: string | number,
  threadId: string,
  threadPage?: string | number
) =>
  threadPage && threadPage !== '0'
    ? `/${forumId}/${forumPage}/${threadId}/${threadPage}`
    : `/${forumId}/${forumPage}/${threadId}`
