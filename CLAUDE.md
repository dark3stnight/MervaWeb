# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MervaWeb is the Angular 20 frontend for the Merva application. The companion API lives at `../Merva/MervaApi/` (HTTP :5157, HTTPS :7236). Production API: `https://mervaapi.azurewebsites.net`.

## Commands

```bash
npm start            # dev server at http://localhost:4200 — uses `local` config (proxy to API :5157)
npm test             # Karma + Jasmine unit tests
npm run build        # production build → dist/merva-client/browser/
npm run watch        # incremental dev build (no serve)
```

### Docker
```bash
docker build -t merva-web .
docker run -p 80:80 merva-web
```
The image uses `nginx:alpine` and serves the production build from port 80. Build output is copied from `dist/merva-client/browser/`.

## Architecture

### Bootstrap

- **`src/app/app.config.ts`** — Providers: zone-based change detection (event coalescing), Router, HttpClient with `authInterceptor`
- **`src/app/app.routes.ts`** — Routes: `''` → `HomeComponent` (only route currently defined)

### Auth Interceptor (`src/app/interceptors/auth.interceptor.ts`)

Reads the stored token via `TokenService.getStoredToken()` and attaches `Authorization: Bearer <token>` to every outgoing HTTP request. Registered globally in `app.config.ts`. All API calls therefore require no manual token passing beyond the initial registration flow.

### Components (`src/app/`)

- **`HomeComponent`** — Dashboard shell: nav, charts, transaction list, budget bars, quick actions (currently static/mock data). Composes `StatsCardsComponent`, `AddExpenseComponent`, and `AccessTokenComponent`. Owns a `refreshTrigger` counter that increments on every `expenseAdded` event from `AddExpenseComponent` and is passed as `[refresh]` to `StatsCardsComponent`.
- **`StatsCardsComponent`** — Four live stat cards: Total Expenses, Total Income, Net Balance, Transactions. On init and on every `refresh` input change, fetches expenses and incomes in parallel via `forkJoin`. Computes totals and net balance from the API responses. Net Balance arrow reflects positive/negative sign.
- **`AddExpenseComponent`** — Add expense form wired to the API. Submits to `POST /expenses` via `ExpenseService`. Emits `expenseAdded` on success to trigger a stats refresh. Contains two feature subfolders:
  - `ExpenseCurrency/expense-currency.ts` — `Currency` string enum
  - `ExpenseCategory/expense-category.ts` — `Category` string enum
- **`AccessTokenComponent`** — Token lifecycle: auto-generates a token on first visit, validates against API, persists in `localStorage` under key `merva_access_token`.
- **`AppComponent`** — Root shell

### Services (`src/app/services/`)

- **`ExpenseService`** — `add(request)` → `POST /expenses`; `getAll()` → `GET /expenses` (returns decrypted `AddExpenseResponse[]` ordered by date desc)
- **`IncomeService`** — `getAll()` → `GET /incomes` (returns decrypted `IncomeResponse[]` ordered by date desc)
- **`TokenService`** — HTTP calls to `TokensController` (register, validate, get). Collects browser fingerprint data. Exposes `getStoredToken()` to read the token from `localStorage`.
- **`HomeService`** — Calls `GET /home`

### Environments

| Config | API base URL |
|---|---|
| `environment.ts` (default/dev) | `https://localhost:7236` |
| `environment.local.ts` | `https://localhost:7236` |
| `environment.prod.ts` | `https://mervaapi.azurewebsites.net` |

`npm start` uses the `local` configuration (defined in `angular.json`) which activates the proxy.

### Proxy (`proxy.conf.json`)

Only routes `/home` → `http://localhost:5157` in local dev. All other API paths (`/tokens`, `/expenses`, `/incomes`) go directly to the HTTPS URL from the environment config.

### TypeScript

Strict mode fully enabled: `strict`, `noImplicitOverride`, `noImplicitReturns`, `strictTemplates`, `strictInjectionParameters`. Target: ES2022. TypeScript version: ~5.9.3.

### Styles

SCSS. Inline style language. Global styles in `src/styles.scss`. Bootstrap imported via `@use` — note: `@import` is deprecated in Dart Sass 3 and currently produces warnings (non-breaking).

### Testing

Karma + Jasmine. Test files colocated with components (`*.spec.ts`).
