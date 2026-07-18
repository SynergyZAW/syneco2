# Synergy Ecosystem — Reference UI (Navigation-Only Build)

This is a **navigation-complete, functionality-stubbed** reference implementation of the
Synergy Group digital ecosystem described in the RFQ (patient onboarding, doctor review,
admin, pharmacy, reseller, partner, and collection point portals).

## What this IS
- A full route map and page shell for all 8 roles.
- Real component structure (Sidebar, Topbar, Cards, Tables, Status badges, Progress rail)
  you can wire real data/logic into.
- A distinct visual identity (see `src/theme.css`) so you're not starting from a blank page.
- Every screen referenced in the RFQ / IT brief exists as a real route with representative
  mock content and correct navigation between screens.

## What this is NOT
- No auth, no backend, no database, no API calls.
- No form submission logic, no payment processing, no real OCR/consent gating.
- Mock data lives in `src/data/mockData.js` — swap this for real API calls later.

## Getting started
```bash
npm install
npm run dev
```
Open the local URL Vite prints. Use the **role switcher** in the top bar (or the landing
screen) to jump between the 8 role experiences — this simply changes a React route/state,
no auth is performed.

## Project structure
```
src/
  main.jsx            # entry point
  App.jsx             # router — this is your map of every screen
  theme.css            # design tokens (colors, type, spacing) — edit here to re-skin everything
  index.css            # base styles + component classes
  data/
    roles.js           # role definitions + nav items per role
    mockData.js         # all placeholder content (patients, orders, KPIs, etc.)
  components/
    layout/             # AppShell, Sidebar, Topbar — the chrome around every page
    ui/                  # reusable primitives: Card, KPICard, StatusBadge, Tabs,
                         # DataTable, ProgressRail, PageHeader, EmptyState
  pages/
    patient/, doctor/, admin/, pharmacy/, reseller/, partner/, collectionpoint/
```

## Extending a page
Every page is a plain React component using the shared `ui` primitives. To wire up real
functionality: replace the imports from `data/mockData.js` with real fetch/query calls,
and add real handlers to the buttons (they are currently inert or just navigate).
