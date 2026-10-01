# GraphQLForum client

React 19 + Vite + Apollo Client 3 + Tailwind CSS 4 + TipTap SPA.

## Setup

```bash
cp .env.example .env   # adjust VITE_AUTH0_* values (or leave the endpoint unset
                       # to use the /graphql dev proxy)
npm install
npm run dev            # http://localhost:5173
```

The dev server proxies `/graphql` (HTTP + websocket) to the API on port 4000.

## Scripts

| Script             | What                                   |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Vite dev server with HMR               |
| `npm run build`    | Typecheck + production build to `dist/`|
| `npm run preview`  | Serve the production build             |
| `npm test`         | Vitest (jsdom + Testing Library)       |
| `npm run lint`     | ESLint (flat config)                   |

## Notes

- Auth0 SPA SDK handles login/logout/callbacks; the API user is fetched with
  a `me` query using the attached access token (`src/apollo.tsx`).
- The route scheme is unchanged from the original app
  (`/:forumId/:forumPage/:threadId/:threadPage`), so old deep links keep
  working. The old `/loggedin_callback` route is gone — Auth0 redirects back
  to the original location via `appState`.
- Administrators see the raw-HTML toggle in the editor and the forum/delete
  controls; the server enforces the same rules.
