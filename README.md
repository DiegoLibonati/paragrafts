# Paragrafts

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Paragrafts** is a lightweight, zero-dependency Lorem Ipsum generator built as a single-page application. It lets you instantly produce any number of placeholder text paragraphs — just type how many you need and hit **Generate**.

Each generation randomly picks from a curated pool of Lorem Ipsum paragraphs, so the output varies every time rather than always starting with the same tired _"Lorem ipsum dolor sit amet..."_ opening. The paragraphs are rendered immediately in the browser with no page reload, no network requests, and no external dependencies at runtime.

The application is designed to be fast and friction-free: open it, enter a number, get your placeholder text. It works entirely client-side, making it suitable for use offline or embedded in any static hosting environment. The interface is minimal by design — a single input, a single button, and a clean output area — so it stays out of the way and lets you copy what you need without distractions.

Under the hood, Paragrafts is written in vanilla TypeScript with no framework, compiled and served through Vite. All components are plain TypeScript factory functions that return DOM elements directly, with no virtual DOM or reactivity layer involved. The codebase follows strict TypeScript settings, includes a full Jest test suite with 100% coverage, and enforces code quality through ESLint and Prettier with pre-commit hooks via Husky.

## Technologies used

The stack is intentionally minimal — no UI framework, no runtime libraries — relying only on the language, the browser, and a modern build tool:

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

Since there are no production dependencies, every library below is a development tool that supports building, testing, linting, or formatting the project.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack above in mind, here is how to run the project locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Testing

Once the app is running locally, you can verify behavior with the Jest test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Beyond functional tests, the dependency tree is audited for known vulnerabilities.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                       ┌─── PR or push to main ───┐
                       ▼                          ▼
┌────────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│    lint-and-audit      │─▶│       testing      │─▶│        build       │
│ eslint · tsc --noEmit  │  │  jest (jsdom env)  │  │  vite production   │
└────────────────────────┘  └────────────────────┘  └────────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint with `typescript-eslint`) and `npm run type-check` (`tsc --noEmit`) to enforce code style and TypeScript correctness.
2. **`testing`** — runs the full Jest test suite with `npm test` in the `jsdom` environment. Depends on `lint-and-audit`.
3. **`build`** — runs `npm run build` (type-check + Vite production bundle) as a smoke test that the project compiles cleanly. Depends on `testing`.

All jobs run on `ubuntu-latest`, install dependencies with `npm ci`, use the Node.js version pinned in [`.nvmrc`](.nvmrc), and cache `npm` between runs.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm test

# build
npm run build
```

### Where the CI logs live

| Output                                 | Location                  |
| -------------------------------------- | ------------------------- |
| Lint, type-check, test, and build logs | **Actions** tab on GitHub |

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/paragrafts`](https://www.diegolibonati.com.ar/#/project/paragrafts)
