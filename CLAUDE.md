# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Revox AI — a real-time video translation/dubbing platform. Users submit YouTube videos and receive AI-generated translations streamed via WebSocket, with 3D animated landing pages and a media player for playback.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build
npm run lint      # Biome lint with auto-fix
npm run format    # Biome format with auto-fix
```

No test infrastructure exists in this project.

Pre-commit hooks (Husky + lint-staged) automatically run Biome on staged `.ts/.tsx` files.

## Architecture

**Pattern**: Feature-Sliced Design (FSD)

```
src/
├── app/        # Providers, routing, layouts, global styles
├── entities/   # Domain entities: auth, user, video, favorites, translations
├── features/   # Feature modules: player, auth forms, video actions, translations
├── pages/      # Route pages split into public/ and private/
├── shared/     # UI primitives, hooks, icons, types, API utilities
└── widgets/    # Composite components: video player, sidebar, prompt
```

Each layer follows this internal structure:
```
feature-name/
├── ui/         # React components
├── model/      # Types, Zod schemas, constants
├── lib/        # Hooks and utilities
├── api/        # React Query API calls
└── index.ts    # Barrel exports
```

## State Management

| Scope | Tool | Usage |
|---|---|---|
| Server state | TanStack React Query v5 | All API calls; global error → toast via MutationCache/QueryCache |
| Global UI state | create-gstore / React Context | `useSession` (JWT), `usePlayer`, `useVolume`, `useModel`, `useAuth` |
| Forms | React Hook Form + Zod | Validation with stricter rules in production (`import.meta.env.PROD`) |

Five context providers compose in `app/ui/app.tsx`: `AuthProvider`, `ThemeProvider`, `PlayerProvider`, `VolumeProvider`, `ModelProvider`.

## API Layer

Located in `src/shared/lib/api.ts`:
- `publicApi()` — unauthenticated requests
- `privateApi()` — auto-refreshes JWT before each request; token stored in localStorage

Dev server proxies to `http://localhost:4200/api`; WebSocket at `ws://localhost:4200`.

## Key Patterns

**Protected routes**: Wrap pages with `ProtectedRoute` + `protectedLoader` (redirects to login if unauthorized).

**Entity hooks**: Each entity exports typed hooks (e.g. `useLogin`, `useVideo`, `useFavorites`) that wrap React Query `useQuery`/`useMutation`.

**WebSocket streaming** (`useTranslationWs`): Chunk-based streaming (30s chunks), prefetches 3 chunks ahead, uses metadata queue for audio sync timing.

**Routes**: Defined as `ROUTES` constant with type-safe params. React Router v7 with lazy-loaded pages.

## Code Standards (Biome — enforced)

- **Filenames**: `kebab-case` required
- **Exports**: `noDefaultExport` is an error — use named exports everywhere (exceptions: `src/app/`, i18n, middleware files)
- **Imports**: `useImportType` — always use `import type` for type-only imports
- **No**: import cycles, `any`, `==` (use `===`), `console.log`
- **Tailwind**: class names must be sorted (`useSortedClasses`)
- **React**: exhaustive deps enforced, hooks at top level only
