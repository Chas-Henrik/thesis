# Coding Standards - Nuxt 4 Project

This document defines coding conventions for the current **Nuxt 4 + TypeScript + Tailwind CSS** project.

## Project Stack

- **Framework**: Nuxt 4 (SSR enabled)
- **Language**: TypeScript (`strict: true`)
- **UI**: Vue 3 (`<script setup lang="ts">`)
- **Styling**: Tailwind CSS (`@nuxtjs/tailwindcss`)
- **State**: Pinia-ready structure (`/stores`)
- **Backend integration points**: Nitro server routes + Supabase client/server wiring

## Current Repository Structure

Use and maintain this root structure:

```text
assets/
components/
composables/
constants/
layouts/
middleware/
pages/
plugins/
public/
scripts/
server/
stores/
types/
utils/
```

Additional server folders used in this project:

```text
server/api/
server/utils/
```

## Naming Conventions

- **Components**: PascalCase (`UserProfile.vue`)
- **Composables**: camelCase with `use` prefix (`useAuth.ts`)
- **Stores**: camelCase with `Store` suffix (`userStore.ts`)
- **Pages**: kebab-case (`user-profile.vue`)
- **Constants**: UPPER_SNAKE_CASE
- **Types/interfaces**: PascalCase

## TypeScript Standards

- Use TypeScript in all supported source files.
- Keep strict typing (`any` should be avoided; use `unknown` when uncertain).
- Define props with an explicit interface and `defineProps<Props>()`.
- Use `withDefaults` for optional props.
- Keep `tsconfig.json` strict options enabled:
  - `strict`
  - `forceConsistentCasingInFileNames`
  - `esModuleInterop`

## Vue & Component Standards

- Use Composition API with `<script setup lang="ts">`.
- Prefer `ref` for both primitives and objects for consistent typing.

### Component Structure

Always follow this order in `<script setup>`:

1. Imports
2. Props & Emits
3. Composables & Stores
4. State (ref/reactive)
5. Computed
6. Methods
7. Lifecycle hooks
8. Watchers

## Pinia Store Standards

- Keep one store per domain.
- Structure stores as: **state → getters → actions**.
- Type state, getters, and actions explicitly.
- In components, use `storeToRefs` when destructuring store state/getters.

## Tailwind CSS Standards

- Use utility classes in templates.
- Follow mobile-first design.
- Primary breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px
- Keep class order consistent where practical:
  - Layout → Box Model → Typography → Visual → Misc
- Avoid custom CSS unless utilities are insufficient.

## Nuxt & Server Standards

- SSR must remain enabled unless requirements explicitly change.
- Place Nitro endpoints in `server/api`.
- Place server helpers in `server/utils`.
- Keep plugins in `plugins/` and scope by runtime when needed (for example, `.client.ts`).
- Use runtime config for secrets and public client config values.

Current Supabase-related environment variables:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Accessibility (WCAG 2.1 AA)

All user-facing UI must follow accessibility basics:

- Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`, etc.)
- Proper heading hierarchy (single `h1` per page)
- Keyboard-accessible interactive elements
- Visible focus states
- No hover-only interactions
- Descriptive labels for form controls
- Meaningful link text
- Touch targets sized for usability (minimum 44x44px)
- Appropriate ARIA usage only when semantic HTML is not enough

## Lint, Build, and Validation

Use existing project scripts:

- `npm run lint`
- `npm run lint:fix`
- `npm run build`
- `npm run dev`
- `npm run preview`

CI runs lint using `.github/workflows/main.yml` (`lint-audit` job).

## Git Workflow

- Branch naming:
  - If creating locally: `123-feature-name`
  - If creating directly in GitHub UI: use a clear, descriptive kebab-case name
- Conventional commit prefixes are recommended when writing commits manually:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `docs:`
  - `style:`
  - `test:`
  - `chore:`

## Scope of This Document

When standards evolve, update this file first, then update `.github/copilot-instructions.md` to match.
