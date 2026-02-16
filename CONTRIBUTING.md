# Contributing

Thanks for wanting to contribute — small, focused PRs are easiest to review.

## Branching & commits

- Create a branch from `main` named `feature/<short-desc>` or `fix/<short-desc>`.
- Write clear commit messages and group related changes into a single PR.

## Tests (important)

- All unit tests live in `src/unit-tests/` and mirror the `src/` layout (components, stores, services, utils).
- Use Vitest + React Testing Library for new tests.
- Test file name: `*.test.ts` / `*.test.tsx`.

Run locally:

```bash
npm test           # watch mode
npm run test:run   # single-run (good for CI)
npm run test:coverage
```

Writing tests:

- Prefer testing behavior over implementation details (user interactions, DOM changes, store updates).
- Keep component tests lightweight; mock external services using `vi.mock`.
- Reset global store state in `beforeEach` when testing stores.
- Use `user-event` for simulating user interactions.

PR checklist

- [ ] Code builds and type-checks (TS).
- [ ] Lint (`npm run lint`) passes.
- [ ] Unit tests added/updated and passing (`npm test` / `npm run test:run`).
- [ ] Include screenshots or short description for UI changes.

If you want help writing tests for a specific area, open an issue or ping a reviewer — happy to assist.
