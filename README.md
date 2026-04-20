# @h4alex/api-contracts

Shared Zod schemas and TypeScript types for H4Cashback frontends
(`cash-front`, `cash-admin`, `cash-e2e`).

## Install

```bash
# requires an .npmrc with auth for GitHub Packages:
# @h4alex:registry=https://npm.pkg.github.com
# //npm.pkg.github.com/:_authToken=<your GitHub PAT with read:packages>

npm install @h4alex/api-contracts
```

## Usage

```ts
import {
  loginRequestSchema,
  type LoginRequest,
  apiResponseSchema,
  paginatedResponseSchema,
} from '@h4alex/api-contracts';

const result = loginRequestSchema.safeParse(body);
```

## Why this exists

Previously the contracts were a local workspace package
(`file:../api-contracts`) shared via symlink. That broke silently when
repos were reorganized into `Repositorios/Cashback/*`. This package is
versioned in Git, published to GitHub Packages, and consumable by any
repo in the org.

## Publishing a new version

1. Bump `version` in `package.json` (semver).
2. Commit and tag: `git tag v1.x.y && git push --tags`.
3. CI (`.github/workflows/publish.yml`) publishes on tag push.

## Structure

- `src/common/` — envelope (ApiResponse, Pagination, errors) + primitives (ISO timestamp, monetary).
- `src/auth/` — login, register, MFA, password recovery, token refresh.
- `src/cashback/` — generate/use cashback, transactions.
- `src/campanha/` — campaign CRUD.
- `src/cliente/` — customer CRUD + saldos.
- `src/empresa/` — company, units, internal users.
- `src/contestacao/` — disputes workflow.
- `src/notificacao/` — notification config.
- `src/assinatura/` — subscription, invoices.
- `src/dashboard/` — stats, charts, top clients.
- `src/auditoria/` — audit log entries.
- `src/index.ts` — re-exports everything.
