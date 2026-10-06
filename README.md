# GraphQLForum

An old-school style photography/discussion forum, re-implemented with modern
techniques. Mainly just an opportunity to try new things.

## Stack

|        | Client                                     | Server                                  |
| ------ | ------------------------------------------ | --------------------------------------- |
| Core   | React 19 + TypeScript (Vite)               | NestJS 12 + TypeScript                  |
| Data   | Apollo Client 3 (HTTP + graphql-ws)        | Apollo Server 5, code-first GraphQL     |
| UI     | Tailwind CSS 4, TipTap editor, react-hook-form | TypeORM 1.x / MySQL 8               |
| Auth   | @auth0/auth0-react (SPA SDK)               | passport-jwt + JWKS token verification  |
| Tests  | Vitest + Testing Library                   | Vitest (unit + e2e, SWC for DI metadata)|
| Tooling| pnpm workspaces + Turborepo                |                                         |

## Quick start

Requires Node 20+ and pnpm (`npm i -g pnpm`, or `corepack enable`).

```bash
# 1. MySQL (creates db `graphqlforum`, user `graphqlforum` / `graphqlforum`)
docker compose up -d

# 2. Install everything (both packages)
pnpm install

# 3. Configure: copy the example env files and fill them in
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. API and client together
pnpm dev                # API http://localhost:4000, client http://localhost:5173

# or run them individually
pnpm --filter server dev
pnpm --filter client dev
```

One-shot quality gates across both packages:

```bash
pnpm build && pnpm lint && pnpm test
```

The Vite dev server proxies `/graphql` (including websockets) to the API, so
no CORS setup is needed.

> **Embedded-browser gotcha:** some in-app/webview browsers cache dev bundles
> aggressively and won't revalidate on refresh, which makes code changes look
> like they "don't work". If behavior seems stale, clear the site's storage
> (devtools → Application → Clear site data) or use a regular browser.

## Auth0 setup

Authentication is real: the server verifies Auth0 access tokens (RS256 via
the tenant's JWKS endpoint) and derives identity/authorization from them.

1. In the Auth0 dashboard create a **Regular Web/SPA Application** — put its
   domain and client ID into the client's `.env`.
2. Create an **API** (e.g. identifier `https://graphqlforum-api`) — its
   identifier is the `audience` in both `.env` files.
3. Allowed callback URLs must include `http://localhost:5173/auth0_callback`,
   allowed logout URLs `http://localhost:5173/loggedout_callback`.
4. Roles: the server reads a namespaced `roles` claim (namespace from
   `AUTH0_NAMESPACE` / `VITE_AUTH0_NAMESPACE`, e.g. `https://graphqlforum.com`).
   Add an Auth0 **Action** on *Login / Post Login* that copies the user's
   `app_metadata.roles` into both the access and ID token:

   ```js
   exports.onExecutePostLogin = async (event, api) => {
     api.accessToken.setCustomClaim(
       `${event.secrets.NAMESPACE}/roles`,
       event.user.app_metadata.roles || []
     )
     api.idToken.setCustomClaim(
       `${event.secrets.NAMESPACE}/roles`,
       event.user.app_metadata.roles || []
     )
   }
   ```

   Users with the `Administrator` role can create forums and edit/delete
   anything; regular users can edit/delete only their own posts.

### Token contents

Auth0 access tokens for a custom API only contain `sub` by default. The same
Action should also copy `name`, `picture` and `email` into the access token as
namespaced claims — otherwise new users get created with a blank profile
(they self-heal on the next login once the claims flow).

## Testing & CI

```bash
pnpm test                    # both packages (server e2e uses DB_* env, skips without)
pnpm --filter server test    # server only
pnpm --filter client test    # client only
```

GitHub Actions run lint/build/test per package (`.github/workflows/`) through
Turborepo, with a MySQL service for the server's e2e tests.

## Project layout

```
server/src
  auth/        JWT strategy, GraphQL guard, @CurrentUser
  common/      Date scalar, PubSub provider, logging plugin
  db/          TypeORM DataSource config
  users/       me/login upsert from token claims
  forums/      forums -> threads -> replies, paginated field resolvers
client/src
  apollo.tsx   token-attending Apollo links (HTTP + ws)
  state/       AuthContext (Auth0 + `me`), navigation cache for refetches
  pages/       home / forum / thread routes and their commands
  components/  UI kit incl. native-<dialog> Modal and TipTap TextEditor
```

## Notable changes in the 2026 modernization

- CRA → Vite; React 16 → 19; react-router 5 → 7; Apollo Boost/@apollo/react-hooks → Apollo Client 3;
  Tailwind 1 → 4 (v1 palette ported); NestJS 7 → 12; Apollo Server 2 → 5; TypeORM 0.2 → 1.x.
- **Security**: identity now comes from a verified Auth0 token instead of a
  client-supplied `code`; all mutations require authentication; update/delete
  are restricted to the author or an Administrator (enforced server-side).
- Froala (trial) replaced by TipTap; `react-use-auth`/`auth0-js` (both long
  deprecated) replaced by `@auth0/auth0-react`; `react-modal` replaced by the
  native `<dialog>` element.
- Bug fixes: `lastReply` used to return the *oldest* reply; the `userAdded`
  subscription listened on a topic nothing published; `updateReply` published
  under a wrong topic; class-validator rules were never active (no
  `ValidationPipe`); `Thread.userLastReply` is now nullable in the schema.
- GraphQL contract changes: `loginUser`/`user(code:)` removed in favour of
  `me` and `login` (token-derived); `authorId` removed from
  `NewThreadInput`/`NewReplyInput`; `deleteThread`/`deleteReply` take `data:`;
  `User.code` is no longer exposed. Subscriptions: `forumAdded`,
  `threadAdded`, `replyAdded` (over graphql-ws).
- Dev-time conveniences: `docker compose` for MySQL, `.env.example` files,
  `synchronize` toggled by `DB_SYNCHRONIZE` (keep it `false` outside dev;
  proper migrations are a sensible follow-up).
