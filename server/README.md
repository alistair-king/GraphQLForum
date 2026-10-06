# GraphQLForum API

NestJS 12 + Apollo Server 5 + TypeORM 1.x (MySQL) GraphQL API.

## Setup

```bash
pnpm install            # from the repo root (pnpm workspaces)
cp .env.example .env    # adjust DB_*/AUTH0_* values
docker compose up -d    # from the repo root, for MySQL
pnpm dev                # or: pnpm --filter server dev (watch mode)
```

`schema.gql` is regenerated on every boot from the code-first decorators.

## Scripts

Run from the repo root with `pnpm --filter server <script>`, or inside
`server/` with `pnpm <script>`:

| Script              | What                                        |
| ------------------- | ------------------------------------------- |
| `dev`               | Watch-mode dev server                       |
| `build`             | Compile to `dist/`                          |
| `start:prod`        | Run the compiled build                      |
| `test`              | Vitest: unit + e2e (e2e skips without `DB_*`)|
| `test:e2e`          | e2e only (needs a reachable MySQL)          |
| `lint`              | ESLint (flat config)                        |

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
