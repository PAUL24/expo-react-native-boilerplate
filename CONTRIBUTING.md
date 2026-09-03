# Contributing

Thank you for improving the boilerplate. Changes should keep the starter understandable, Expo-first, and useful across products rather than optimizing for one application.

## Development

```bash
npm install
cp .env.example .env
npm start
```

Use Node.js 22.13 or newer and npm. The committed `.npmrc` keeps peer-dependency resolution aligned with EAS Build; do not override it with `legacy-peer-deps=true`. Do not add Yarn or pnpm lockfiles.

## Before opening a pull request

```bash
npm run validate
npm run export:web
```

Add or update tests for observable behavior. Tests must not use a live network. Explain new dependencies and verify them with Expo Doctor.

## Architecture expectations

- Keep `app/` limited to route coordination.
- Put screen implementations in `src/screens/`.
- Put transport in services, server state in query hooks, and runtime contracts in schemas.
- Use theme tokens and translation keys in shared/user-facing UI.
- Keep secrets out of the repository and `EXPO_PUBLIC_*` values.
- Prefer Expo modules and config plugins; do not commit generated native projects.

## Commits and pull requests

Use concise imperative commits, for example `feat: add profile query`. Keep pull requests focused, describe validation performed, and attach screenshots for visible UI changes.

By contributing, you agree that your contribution is licensed under the MIT License.
