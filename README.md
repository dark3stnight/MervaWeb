# Merva Web

Angular 20 SPA for the Merva personal finance tracking application. Provides a dashboard to view expenses, incomes, net balance, and manage transactions.

## Tech Stack

- **Framework**: Angular 20 (TypeScript / SCSS)
- **UI**: Bootstrap 5 + ng-bootstrap
- **Charts**: ApexCharts
- **Testing**: Karma + Jasmine
- **Deployment**: Docker (nginx:alpine), Azure Pipelines

## Prerequisites

- Node.js 20+
- [Merva Backend](../MervaBackend) running on `:5157` / `:7236` for local development

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:4200
```

The dev server proxies `/home` to `http://localhost:5157`. All other API paths (`/tokens`, `/expenses`, `/incomes`) hit the HTTPS backend at `https://localhost:7236` directly.

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server at `http://localhost:4200` |
| `npm test` | Unit tests (Karma + Jasmine) |
| `npm run build` | Production build → `dist/merva-client/browser/` |
| `npm run watch` | Incremental dev build (no serve) |

## Docker

```bash
docker build -t merva-web .
docker run -p 80:80 merva-web
```

Serves the production build via nginx on port 80.

## Features

- **Dashboard** — stat cards for Total Expenses, Total Income, Net Balance, and Transaction Count, all fetched live from the API
- **Add Expense** — form with currency and category selection; stats refresh automatically on submit
- **Anonymous Auth** — auto-generates a token on first visit, persists it in `localStorage`, and injects `Authorization: Bearer` on every API request via an HTTP interceptor
- **Responsive** — Bootstrap 5 layout

## Project Structure

```
src/app/
├── components/
│   ├── home/              # Dashboard shell (nav, charts, layout)
│   ├── stats-cards/       # Live stat cards (forkJoin expenses + incomes)
│   ├── add-expense/       # Add expense form + Currency/Category enums
│   └── access-token/      # Token lifecycle (generate, validate, persist)
├── interceptors/
│   └── auth.interceptor.ts   # Bearer token injection
└── services/
    ├── expense.service.ts
    ├── income.service.ts
    ├── token.service.ts
    └── home.service.ts
```

## Environment Configuration

| Config | API Base URL |
|--------|-------------|
| local (dev) | `https://localhost:7236` + proxy for `/home` |
| production | `https://mervaapi.azurewebsites.net` |
