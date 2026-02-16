# Menu Management Dashboard 🍽️

A small admin dashboard for managing restaurant menu items — built with React, TypeScript, Vite, Tailwind CSS and Zustand for state management. This repo contains a UI to add/edit/delete menu items, filter and sort them, and manage currency display.

---

## ✅ Features

- Add / edit / remove menu items
- Search, filter by category and sort items
- Local state management with `zustand` stores
- Mock data + simple service layer (`menuService`) for easy replacement with an API
- Responsive UI components (cards, forms, dialogs)

## 🧰 Tech stack

- React + Vite + TypeScript
- Tailwind CSS for styling
- Zustand for global state
- ESLint + TypeScript config

## 🔁 Quick start

Prerequisites: Node 18+ (or current LTS), npm/yarn/pnpm

1. Install dependencies

   ```bash
   npm install
   ```

2. Start dev server

   ```bash
   npm run dev
   ```

3. Build for production

   ```bash
   npm run build
   npm run preview   # preview the production build
   ```

4. Lint

   ```bash
   npm run lint
   ```

## 📄 Available scripts

- `npm run dev` — start development server (Vite + HMR)
- `npm run build` — compile TypeScript and build production assets
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint
- `npm test` — run Vitest in watch mode (runs tests under `src/unit-tests/`)
- `npm run test:run` — run the full test suite once (CI-friendly)
- `npm run test:coverage` — run tests and collect coverage report

## 🧪 Testing

- Test location: `src/unit-tests/` (tests are organized to mirror `src/` component/service/store layout).
- Test framework: **Vitest** + React Testing Library + jsdom.

Quick commands:

```bash
npm test           # watch mode
npm run test:run   # single run (CI)
npx vitest src/unit-tests/path/to/file.test.tsx  # run a single test file
```

Guidelines:
- Add new unit tests under `src/unit-tests/` following the existing folder structure.
- Name test files `*.test.ts` or `*.test.tsx` next to the logical area under `src/unit-tests/`.
- Use React Testing Library for components and vitest `vi` for mocks/stubs.

The test runner is configured to only run files under `src/unit-tests/` (see `vite.config.js`).

## 📁 Project structure (important files)

- `src/pages/Dashboard.tsx` — main page
- `src/components/dashboard/` — menu list & item components (`MenuItemCard`, `MenuItemForm`, etc.)
- `src/components/filters/` — search, category filter, sort
- `src/components/forms/MenuItemForm.tsx` — add / edit menu items UI
- `src/stores/` — `menuStore.ts`, `currencyStore.ts`, `toastStore.ts`, `uiStore.ts`
- `src/services/menuService.ts` — mock service layer
- `src/data/mockData.ts` — initial sample data
- `src/utils/currency.ts` — currency helper utilities

## 🔍 Where to start (for contributors)

1. Open `src/pages/Dashboard.tsx` to see how components are composed.
2. Inspect `src/stores/menuStore.ts` to understand state updates and actions.
3. `MenuItemForm.tsx` is the entry point for adding/editing items.

## 💡 Implementation notes & extensibility

- The app uses `menuService` + `mockData` so swapping in a real API is straightforward.
- Global state is handled by `zustand` stores — add selectors/actions in `src/stores`.
- Components are small and focused; add unit tests and Storybook if you plan to expand the UI.

## Contributing

- Fork the repo, create a feature branch, and open a PR with a clear description.
- Run `npm run lint` and ensure TypeScript compiles before submitting.

## License

MIT — add a `LICENSE` file if you want this to be an official open-source project.

---

If you'd like, I can also add a short CONTRIBUTING guide, example Cypress tests, or a LICENSE file. Which addition should I make next? 🚀

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
