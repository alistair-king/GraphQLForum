# GraphQLForum API

NestJS 12 + Apollo Server 5 + TypeORM 1.x (MySQL) GraphQL API.

## Setup

```bash
cp .env.example .env   # adjust DB_*/AUTH0_* values
npm install
docker compose up -d   # from the repo root, for MySQL
npm run start:dev      # playground at http://localhost:4000/graphql
```

`schema.gql` is regenerated on every boot from the code-first decorators.

## Scripts

| Script              | What                                        |
| ------------------- | ------------------------------------------- |
| `npm run start:dev` | Watch-mode dev server                       |
| `npm run build`     | Compile to `dist/`                          |
| `npm run start:prod`| Run the compiled build                      |
| `npm test`          | Vitest: unit + e2e (e2e skips without `DB_*`)|
| `npm run test:e2e`  | e2e only (needs a reachable MySQL)          |
| `npm run lint`      | ESLint (flat config)                        |

## Auth

Every mutation requires `Authorization: Bearer <Auth0 access token>`.
Tokens are verified against the tenant JWKS (`AUTH0_DOMAIN`,
`AUTH0_AUDIENCE`, optional `AUTH0_ISSUER`). The user record is upserted from
the token's claims; `login` counts the login (once per browser session by the
client), `me` just reads. Update/delete mutations enforce author-or-
`Administrator` (from the namespaced roles claim) server-side.

`DB_SYNCHRONIZE=true` auto-syncs the schema on boot — convenient in dev, do
not use it against production data (see the root README for the follow-up
note on migrations).
