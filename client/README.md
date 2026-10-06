# GraphQLForum client

React 19 + Vite + Apollo Client 3 + Tailwind CSS 4 + TipTap SPA.

## Setup

```bash
pnpm install            # from the repo root (pnpm workspaces)
cp .env.example .env    # adjust VITE_AUTH0_* values (or leave the endpoint unset
                        # to use the /graphql dev proxy)
pnpm dev                # http://localhost:5173
```

The dev server proxies `/graphql` (HTTP + websocket) to the API on port 4000.

## Scripts

Run from the repo root with `pnpm --filter client <script>`, or inside
`client/` with `pnpm <script>`:

| Script             | What                                   |
| ------------------ | -------------------------------------- |
| `dev`              | Vite dev server with HMR               |
| `build`            | Typecheck + production build to `dist/`|
| `preview`          | Serve the production build             |
| `test`             | Vitest (jsdom + Testing Library)       |
| `lint`             | oxlint                                 |

## Notes

- Auth0 SPA SDK handles login/logout/callbacks; the API user is fetched with
  a `me` query using the attached access token (`src/apollo.tsx`).
- The route scheme is unchanged from the original app
  (`/:forumId/:forumPage/:threadId/:threadPage`), so old deep links keep
  working. The old `/loggedin_callback` route is gone — Auth0 redirects back
  to the original location via `appState`.
- Administrators see the raw-HTML toggle in the editor and the forum/delete
  controls; the server enforces the same rules.
