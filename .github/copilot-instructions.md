# Copilot Instructions

Follow `CODING_STANDARDS.md` as the source of truth for this Nuxt 4 project.

## Critical Rules

### Project Context

- Nuxt 4 with SSR enabled
- TypeScript strict mode
- Tailwind CSS for styling
- Nitro server routes and Supabase integration points are present

### Component `<script setup>` Order

Always keep this order:

1. Imports
2. Props & Emits
3. Composables & Stores
4. State (ref/reactive)
5. Computed
6. Methods
7. Lifecycle hooks
8. Watchers

### TypeScript

- Use strict typing
- Use `defineProps<Props>()` with interfaces
- Use `withDefaults` for optional props
- Avoid `any`; use `unknown` where type is uncertain

### Vue 3 / Pinia

- Use Composition API with `<script setup lang="ts">`
- Prefer `ref` for reliable TS inference
- Use `storeToRefs` when destructuring store state/getters
- Keep store shape as `state -> getters -> actions`

### Tailwind

- Mobile-first responsive classes
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Prefer utility classes; avoid custom CSS unless necessary
- Keep class order consistent: Layout → Box Model → Typography → Visual → Misc

### Naming

- Components: PascalCase
- Composables: `useXxx`
- Stores: `xxxStore`
- Pages: kebab-case
- Constants: UPPER_SNAKE_CASE

### Accessibility

- Use semantic HTML
- Preserve heading hierarchy
- Ensure keyboard accessibility and visible focus states
- Avoid hover-only behavior
- Provide labels/ARIA metadata where needed

### Validation

Use existing scripts before finalizing:

- `npm run lint`
- `npm run build`

### Git Workflow

Use branch naming and conventional commit prefixes defined in `CODING_STANDARDS.md`.
