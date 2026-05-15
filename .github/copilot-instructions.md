# Copilot Instructions

Follow all coding standards defined in CODING_STANDARDS.md for this Nuxt 3 project.

## Critical Standards

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

### TypeScript

- Use TypeScript with strict typing for all files
- Define props with `defineProps<Props>()` interface
- Use `withDefaults` for optional props
- Avoid `any` - use `unknown` when type is uncertain

### Vue 3 Patterns

- Use Composition API with `<script setup lang="ts">`
- Use `ref` for primitives and objects (better TS support)
- Destructure stores with `storeToRefs` for reactivity

### Pinia Stores

- One store per domain (user, cart, products)
- Structure: state → getters → actions
- Type everything with interfaces

### Tailwind CSS

- Mobile-first responsive design
- Breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
- Use utility classes in template, avoid custom CSS unless necessary
- Class order: Layout → Box Model → Typography → Visual → Misc
- **Theme colors**: Use `primary`, `secondary`, `success`, `warning`, `error` from theme
- **Fonts**: Use `font-body`, `font-display` as defined in theme
- **Border radius**: Use semantic values like `rounded-button`, `rounded-card`, `rounded-input`
- Always use theme values instead of arbitrary colors/sizes

### Naming Conventions

- Components: PascalCase (`UserProfile.vue`)
- Composables: camelCase with `use` prefix (`useAuth.ts`)
- Stores: camelCase with Store suffix (`userStore.ts`)
- Pages: kebab-case (`user-profile.vue`)
- Constants: UPPER_SNAKE_CASE

### Accessibility (WCAG 2.1 AA)

**All code must be accessible:**

- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1-h6, no skipping levels, only one h1 per page)
- All images must have descriptive `alt` text (empty `alt=""` for decorative)
- All interactive elements keyboard accessible (Tab, Enter, Escape, Arrow keys)
- Visible focus indicators on all interactive elements
- **No hover-dependent functionality** - provide click/tap alternatives for all hover interactions
- ARIA attributes when needed: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`
- Forms: every input has `<label>`, use `aria-invalid` and `aria-describedby` for errors
- Color contrast: 4.5:1 for normal text, 3:1 for large text/UI components
- Links: descriptive text (avoid "click here"), use `<a>` for navigation, `<button>` for actions
- Minimum touch target: 44x44px
- Screen reader text: use `.sr-only` class for important context
- Test with keyboard navigation and screen readers

### Git Workflow

- Branch naming: `123-feature-name` (use issue numbers)
- Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`
