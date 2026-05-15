# Coding Standards - Nuxt 3 Project

## Table of Contents

1. [Project Stack](#project-stack)
2. [File and Folder Structure](#file-and-folder-structure)
3. [Naming Conventions](#naming-conventions)
4. [TypeScript Guidelines](#typescript-guidelines)
5. [Vue 3 Composition API](#vue-3-composition-api)
6. [Component File Structure](#component-file-structure)
7. [Pinia State Management](#pinia-state-management)
8. [Tailwind CSS Standards](#tailwind-css-standards)
9. [Code Style and Formatting](#code-style-and-formatting)
10. [Performance Best Practices](#performance-best-practices)
11. [Accessibility Standards (WCAG)](#accessibility-standards-wcag)
12. [Git Workflow](#git-workflow)

---

## Project Stack

- **Framework**: Nuxt 3 (SSR + SSG)
- **Rendering Mode**: Hybrid (Server-Side Rendering + Static Site Generation)
- **UI Framework**: Vue 3
- **API Pattern**: Composition API
- **Language**: TypeScript
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Package Manager**: npm/pnpm/yarn

### Rendering Strategy

This project uses a **hybrid approach** combining SSR and SSG:

- **SSR (Server-Side Rendering)**: Enabled (`ssr: true`)
  - Pages are rendered on the server for initial requests
  - Provides better SEO and faster initial page load
  - Dynamic content rendered at request time
- **SSG (Static Site Generation)**: Via Nitro preset (`preset: 'static'`)
  - Build-time pre-rendering of pages
  - Generates static HTML files for deployment
  - Ideal for pages that don't change frequently
  - Can be deployed to static hosting (Netlify, Vercel, etc.)

**Build Commands:**

- `npm run dev` - Development with SSR
- `npm run build` - Production build with static generation
- `npm run generate` - Full static generation (SSG)
- `npm run preview` - Preview production build locally

---

## File and Folder Structure

### Directory Structure

```
TriColorScreen/
├── .github/                # GitHub workflows and config
├── .nuxt/                  # Nuxt build output (generated)
├── .output/                # Production build output
├── assets/                 # Uncompiled assets
│   ├── css/                # CSS files (Tailwind, custom styles)
│   └── images/             # Image assets organized by feature
│       ├── brag-bar/       # Brag bar component images
│       ├── footer/         # Footer component images
│       ├── header/         # Header component images
│       ├── tcs-wallpaper.png   # Background wallpaper (fallback)
│       └── tcs-wallpaper.webp  # Background wallpaper (WebP)
├── components/             # Vue components
│   ├── base/               # Base/primitive components (BaseButton, BaseInput)
│   ├── common/             # Common reusable components
│   ├── features/           # Feature-specific components
│   └── layout/             # Layout-specific components (Header, Footer)
├── composables/            # Composable functions (useAuth, useFetch, etc.)
├── layouts/                # Layout templates (default.vue, etc.)
├── middleware/             # Route middleware
├── pages/                  # File-based routing pages
│   ├── about.vue           # About page
│   ├── contact.vue         # Contact page
│   ├── index.vue           # Home page
│   └── services/           # Services pages
├── plugins/                # Nuxt plugins
├── public/                 # Static files (served as-is)
│   ├── data/               # Public data organized by page
│   │   ├── about/          # About page data
│   │   ├── contact/        # Contact page data
│   │   ├── custom-design/  # Custom design data
│   │   ├── index/          # Home page data
│   │   └── services/       # Services page data
│   ├── images/             # Public images organized by page
│   │   ├── about/          # About page images
│   │   ├── contact/        # Contact page images
│   │   ├── custom-design/  # Custom design images
│   │   ├── index/          # Home page images
│   │   └── services/       # Services page images
│   ├── favicon.ico         # Site favicon
│   └── robots.txt          # SEO robots file
├── server/                 # Server-side code
│   ├── api/                # API endpoints
│   ├── middleware/         # Server middleware
│   └── utils/              # Server utilities
├── stores/                 # Pinia stores (userStore, cartStore, etc.)
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── app.vue                 # Root Vue component
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Dependencies and scripts
├── CODING_STANDARDS.md     # This file
└── README.md               # Readme file
```

### Component Organization

- **Base components**: Reusable, presentational components (prefix with `Base`)
- **Feature components**: Feature-specific components grouped by feature
- **Layout components**: Application layout components (Header, Sidebar, Footer)
- **Page components**: Route-level components in `/pages`

---

## Naming Conventions

### Files and Folders

- **Components**: PascalCase (e.g., `UserProfile.vue`, `BaseButton.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useFetch.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `userStore.ts`, `cartStore.ts`)
- **Types/Interfaces**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Pages**: kebab-case (e.g., `about-us.vue`, `user-profile.vue`)

### Code Naming

```typescript
// Components - PascalCase
const UserProfile = defineComponent({ ... })

// Variables and functions - camelCase
const userName = 'John'
const getUserData = () => { ... }

// Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3

// Types/Interfaces - PascalCase with 'I' prefix for interfaces
interface IUser {
  id: string
  name: string
}

type UserRole = 'admin' | 'user' | 'guest'

// Enums - PascalCase
enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}
```

### Image Naming Conventions

Use descriptive, kebab-case names with responsive suffixes based on Tailwind breakpoints:

```
public/images/page/
├── hero-banner.png                   # Base/fallback image
├── hero-banner-mobile.webp           # < 640px (sm breakpoint)
├── hero-banner-tablet.webp           # 640px - 1024px (sm to lg)
├── hero-banner-desktop.webp          # ≥ 1024px (lg breakpoint)
├── product-thumbnail.webp
├── product-thumbnail-mobile.webp
├── product-thumbnail-tablet.webp
├── product-thumbnail-desktop.webp
├── company-logo.svg                   # Vector logo (no variants needed)
└── icon-search.svg                    # Icon (no variants needed)
```

**Naming Pattern**:

```
{descriptive-name}-{breakpoint}.{format}
```

**Breakpoint Suffixes** (aligned with Tailwind):

- `-mobile`: < 640px (targets phone screens, Tailwind's sm breakpoint)
- `-tablet`: 640px - 1024px (targets sm/md breakpoints)
- `-desktop`: ≥ 1024px (targets lg+ breakpoints)
- No suffix: Fallback/default image or resolution-independent assets

**Format Guidelines**:

- **WebP**: Primary format for modern browsers (best compression)
- **PNG**: Fallback format or when transparency is required
- **AVIF**: Optional for even better compression (cutting-edge)
- **SVG**: Vector graphics, icons, logos (resolution-independent)
- **JPG/JPEG**: Photos without transparency (good compression)

**Examples**:

```
company-logo.svg                       # Vector logo (no responsive variants needed)
team-photo-mobile.webp                 # Mobile-optimized team photo
team-photo-tablet.webp                 # Tablet-optimized team photo
team-photo-desktop.webp                # Desktop-optimized team photo
background-pattern-mobile.png          # Mobile background with transparency
background-pattern-desktop.png         # Desktop background with transparency
icon-search.svg                        # Icon (no responsive variants)
hero-image.jpg                         # Fallback format
hero-image-mobile.webp                 # Mobile WebP variant
hero-image-desktop.webp                # Desktop WebP variant
```

**Usage with Nuxt Image**:

```vue
<template>
  <!-- Automatic responsive images with Nuxt Image -->
  <NuxtPicture
    src="/images/hero-banner.png"
    :img-attrs="{ alt: 'Hero banner showcasing our services' }"
    format="webp"
    sizes="sm:640px md:768px lg:1024px xl:1280px"
    loading="lazy"
  />

  <!-- Manual responsive images with picture element -->
  <picture>
    <source
      srcset="/images/hero-banner-desktop.webp"
      media="(min-width: 1024px)"
      type="image/webp"
    />
    <source srcset="/images/hero-banner-tablet.webp" media="(min-width: 640px)" type="image/webp" />
    <source srcset="/images/hero-banner-mobile.webp" media="(max-width: 639px)" type="image/webp" />
    <img src="/images/hero-banner.png" alt="Hero banner showcasing our services" loading="lazy" />
  </picture>

  <!-- Simple image with Nuxt Image optimization -->
  <NuxtImg
    src="/images/product-thumbnail.webp"
    alt="Product thumbnail"
    width="400"
    height="300"
    loading="lazy"
  />

  <!-- SVG icons (no optimization needed) -->
  <img src="/images/icon-search.svg" alt="Search" class="w-6 h-6" />
</template>
```

**Best Practices**:

- Always use descriptive names (avoid `image1.png`, `photo.jpg`, `pic.webp`)
- Use WebP for photos and complex images (better compression than PNG/JPG)
- Use SVG for logos, icons, and simple graphics (resolution-independent)
- Provide fallback PNG/JPG for older browsers when using picture element
- Include all responsive variants for critical/large images
- Use lazy loading for below-the-fold images (`loading="lazy"`)
- Optimize images before committing (use tools like ImageOptim, Squoosh, TinyPNG)
- Store images in `public/images/` directory for static assets
- Consider using `assets/images/` for images that need build-time processing
- Name image files in English, avoid special characters except hyphens
- Keep filenames concise but descriptive (max ~50 characters)

**Image Optimization Checklist**:

- [ ] Use appropriate format (WebP for photos, SVG for vectors)
- [ ] Compress images before committing
- [ ] Provide responsive variants for large images
- [ ] Include descriptive alt text in components
- [ ] Use lazy loading for non-critical images
- [ ] Test images on different devices and screen sizes
- [ ] Ensure images meet WCAG accessibility standards

---

## TypeScript Guidelines

### Type Definitions

```typescript
// Define types in separate files when used across multiple components
// types/user.ts
export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: Date
}

export type UserRole = 'admin' | 'user' | 'guest'

// Use type inference when obvious
const count = 0 // inferred as number
const items: string[] = [] // explicit when empty

// Avoid 'any' - use 'unknown' when type is truly unknown
const data: unknown = await fetchData()
```

### Component Props with TypeScript

```typescript
<script setup lang="ts">
// Define props interface
interface Props {
  title: string
  count?: number
  isActive?: boolean
  items: string[]
  user: IUser
}

// Use withDefaults for optional props
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isActive: false
})
</script>
```

### Emits with TypeScript

```typescript
<script setup lang="ts">
// Define typed emits
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
  change: [payload: { field: string; value: unknown }]
}>()

// Usage
emit('update', 'new value')
emit('delete', 123)
emit('change', { field: 'name', value: 'John' })
</script>
```

---

## Vue 3 Composition API

### Script Setup Pattern

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/userStore'
import type { IUser } from '~/types/user'

// 2. Props and Emits
interface Props {
  userId: string
}
const props = defineProps<Props>()
const emit = defineEmits<{ update: [user: IUser] }>()

// 3. Composables and Stores
const userStore = useUserStore()
const { data, loading } = useAsyncData('user', () => fetchUser(props.userId))

// 4. Reactive State
const isEditing = ref(false)
const formData = ref<Partial<IUser>>({})

// 5. Computed Properties
const fullName = computed(() => {
  return `${data.value?.firstName} ${data.value?.lastName}`
})

// 6. Methods
const handleSubmit = async () => {
  try {
    const updated = await updateUser(formData.value)
    emit('update', updated)
  } catch (error) {
    console.error('Update failed:', error)
  }
}

// 7. Lifecycle Hooks
onMounted(() => {
  console.log('Component mounted')
})

// 8. Watchers
watch(
  () => props.userId,
  newId => {
    console.log('User ID changed:', newId)
  }
)
</script>
```

### Composables Best Practices

```typescript
// composables/useCounter.ts
export const useCounter = (initialValue = 0) => {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initialValue)

  return {
    count: readonly(count), // Export as readonly when appropriate
    increment,
    decrement,
    reset,
  }
}

// Usage in component
const { count, increment } = useCounter(10)
```

### Refs and Reactive

```typescript
// Use ref for primitives
const count = ref(0)
const name = ref('John')

// Use reactive for objects (or ref for better TypeScript support)
const user = ref<IUser>({
  id: '1',
  name: 'John',
  email: 'john@example.com'
})

// Avoid reactive for complex types - use ref instead
// ❌ Avoid
const user = reactive<IUser>({ ... })

// ✅ Prefer
const user = ref<IUser>({ ... })
```

---

## Component File Structure

### Standard Component Template

```vue
<script setup lang="ts">
/**
 * ComponentName
 *
 * @description Brief description of component purpose
 * @example
 * <ComponentName
 *   :prop="value"
 *   @event="handler"
 * />
 */

// ===== IMPORTS =====
import { ref, computed, watch, onMounted } from 'vue'
import type { IComponentProps } from '~/types'

// ===== PROPS & EMITS =====
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

const emit = defineEmits<{
  update: [value: string]
}>()

// ===== COMPOSABLES & STORES =====
const { data } = await useFetch('/api/data')

// ===== STATE =====
const isVisible = ref(false)
const items = ref<string[]>([])

// ===== COMPUTED =====
const totalItems = computed(() => items.value.length)

// ===== METHODS =====
const handleClick = () => {
  emit('update', 'new value')
}

// ===== LIFECYCLE =====
onMounted(() => {
  // Initialization logic
})

// ===== WATCHERS =====
watch(
  () => props.count,
  newCount => {
    console.log('Count changed:', newCount)
  }
)
</script>

<template>
  <div class="component-name">
    <!-- Component template -->
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p class="text-gray-600">Count: {{ count }}</p>

    <button @click="handleClick" class="btn-primary">Click me</button>
  </div>
</template>

<style scoped>
/* Component-specific styles (use Tailwind classes in template when possible) */
.component-name {
  /* Only add custom CSS when Tailwind utilities are insufficient */
}
</style>
```

### Component Size Guidelines

- **Max 300 lines**: Consider splitting into smaller components
- **Single responsibility**: Each component should have one clear purpose
- **Composables**: Extract complex logic into composables
- **Child components**: Break down large components into logical sub-components

---

## Pinia State Management

### Store Structure

```typescript
// stores/userStore.ts
import { defineStore } from 'pinia'
import type { IUser } from '~/types/user'

interface UserState {
  currentUser: IUser | null
  users: IUser[]
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  // ===== STATE =====
  state: (): UserState => ({
    currentUser: null,
    users: [],
    loading: false,
    error: null,
  }),

  // ===== GETTERS =====
  getters: {
    isAuthenticated: (state): boolean => {
      return state.currentUser !== null
    },

    getUserById: state => {
      return (userId: string): IUser | undefined => {
        return state.users.find(user => user.id === userId)
      }
    },

    activeUsers: (state): IUser[] => {
      return state.users.filter(user => user.status === 'active')
    },
  },

  // ===== ACTIONS =====
  actions: {
    async fetchCurrentUser() {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch<IUser>('/api/user/me')
        this.currentUser = response
      } catch (error) {
        this.error = 'Failed to fetch user'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async updateUser(userId: string, data: Partial<IUser>) {
      try {
        const updated = await $fetch<IUser>(`/api/users/${userId}`, {
          method: 'PATCH',
          body: data,
        })

        // Update in array
        const index = this.users.findIndex(u => u.id === userId)
        if (index !== -1) {
          this.users[index] = updated
        }

        // Update current user if it's them
        if (this.currentUser?.id === userId) {
          this.currentUser = updated
        }

        return updated
      } catch (error) {
        this.error = 'Failed to update user'
        throw error
      }
    },

    logout() {
      this.currentUser = null
    },
  },
})
```

### Store Usage in Components

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/userStore'

// Get store instance
const userStore = useUserStore()

// Use storeToRefs for reactive state/getters
const { currentUser, isAuthenticated, loading } = storeToRefs(userStore)

// Actions can be destructured directly
const { fetchCurrentUser, logout } = userStore

// Call actions
onMounted(async () => {
  await fetchCurrentUser()
})
</script>
```

### Store Best Practices

- **One store per domain**: User, Cart, Products, etc.
- **Normalized state**: Avoid nested structures, use IDs for relationships
- **Type everything**: Full TypeScript support for state, getters, actions
- **Error handling**: Always handle errors in actions
- **Loading states**: Track loading for async operations
- **Immutability**: Never mutate state directly outside actions

---

## Tailwind CSS Standards

### Media Breakpoints

```typescript
// Tailwind default breakpoints (configured in tailwind.config.ts)
const breakpoints = {
  sm: '640px', // Small devices (landscape phones)
  md: '768px', // Medium devices (tablets)
  lg: '1024px', // Large devices (desktops)
  xl: '1280px', // Extra large devices (large desktops)
  '2xl': '1536px', // 2X Extra large devices (larger desktops)
}

// Custom breakpoints (add to tailwind.config.ts if needed)
export default {
  theme: {
    screens: {
      xs: '475px',
      ...breakpoints,
      '3xl': '1920px',
    },
  },
}
```

### Responsive Design Pattern

```vue
<template>
  <!-- Mobile-first approach -->
  <div
    class="
    w-full px-4
    sm:px-6
    md:w-3/4 md:px-8
    lg:w-2/3 lg:px-12
    xl:w-1/2
  "
  >
    <!-- Grid layout -->
    <div
      class="
      grid grid-cols-1 gap-4
      sm:grid-cols-2 sm:gap-6
      lg:grid-cols-3 lg:gap-8
      xl:grid-cols-4
    "
    >
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
```

### Class Organization

```vue
<template>
  <!-- Order: Layout → Box Model → Typography → Visual → Misc -->
  <button
    class="
    flex items-center justify-center
    w-full px-6 py-3 rounded-lg
    text-base font-semibold text-white
    bg-blue-600 hover:bg-blue-700
    transition-colors duration-200
    outline-visible-spaced-button
    disabled:opacity-50 disabled:cursor-not-allowed
  "
  >
    Click Me
  </button>
</template>
```

### Custom Classes and Components

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... full scale
          900: '#1e3a8a',
        },
        secondary: {
          /* ... */
        },
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    // Custom component classes
    function ({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200':
            {},
        },
        '.btn-secondary': {
          '@apply px-6 py-3 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors duration-200':
            {},
        },
        '.card': {
          '@apply bg-white rounded-lg shadow-md p-6': {},
        },
      })
    },
  ],
}
```

### CSS Organization

```vue
<style scoped>
/* Use Tailwind utilities in template whenever possible */
/* Only add custom CSS for unique cases */

/* Component-specific overrides */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

/* Complex animations not available in Tailwind */
@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in-animation {
  animation: slide-in 0.3s ease-out;
}
</style>
```

### Avoid Style Duplication

```vue
<!-- ❌ Bad: Repetitive classes -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Button 1
</button>
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Button 2
</button>

<!-- ✅ Good: Create a base component -->
<BaseButton>Button 1</BaseButton>
<BaseButton>Button 2</BaseButton>

<!-- ✅ Good: Use custom Tailwind component class -->
<button class="btn-primary">Button 1</button>
<button class="btn-primary">Button 2</button>
```

### Theme Configuration

#### Custom Theme Colors

Define project-specific colors in `tailwind.config.ts` to maintain consistent branding:

```typescript
// tailwind.config.ts
// Theme based on CMYK color model from company logo:
// Cyan (#009FE3), Yellow (#FFED00), with Green as positive secondary
// Designed for black header/footer and white body with WCAG AA compliance
export default {
  theme: {
    extend: {
      colors: {
        // Primary brand color - CMYK Cyan (C=100% from logo)
        primary: {
          50: '#f0f9ff',
          100: '#e0f3fe',
          200: '#bae7fd',
          300: '#7dd5fc',
          400: '#38bff8',
          500: '#0ea5e9',
          600: '#009fe3', // Logo Cyan - WCAG AA on white (3.12:1 for large text)
          700: '#017db5',
          800: '#066694',
          900: '#0b567a',
          950: '#073651',
        },
        // Secondary brand color - Green (fresh, positive alternative)
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Vibrant green - positive and energetic
          600: '#16a34a', // WCAG AA compliant on white (4.54:1)
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Accent color - CMYK Yellow (Y=100% from logo)
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#ffed00', // Logo Yellow - Use with dark text only
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04', // WCAG AA compliant on white (4.54:1)
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Layout colors - CMYK Black (K=100% from logo) for header/footer
        layout: {
          header: '#000000', // CMYK Black for header/footer
          body: '#ffffff', // Pure white for body
          'text-on-dark': '#ffffff', // White text on black header (21:1 contrast)
          'text-on-light': '#000000', // Black text on white body (21:1 contrast)
        },
        // Semantic colors - WCAG AA compliant
        // Designed to be visually distinct from brand colors (pink/yellow/blue)
        success: {
          light: '#86efac',
          DEFAULT: '#16a34a', // Green - WCAG AA on white (4.54:1)
          dark: '#15803d', // WCAG AA on white (5.98:1)
        },
        warning: {
          light: '#fed7aa',
          DEFAULT: '#d97706', // Deep orange - WCAG AA on white (5.15:1) - distinct from accent yellow
          dark: '#b45309', // WCAG AA on white (7.15:1)
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#c81e1e', // Pure red - WCAG AA on white (6.50:1)
          dark: '#991b1b', // WCAG AA on white (8.59:1)
        },
        info: {
          light: '#a5b4fc',
          DEFAULT: '#4f46e5', // Indigo/purple - WCAG AA on white (6.26:1) - distinct from primary blue
          dark: '#3730a3', // WCAG AA on white (9.67:1)
        },
        // Neutral/Gray scale - WCAG AA compliant shades
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373', // WCAG AA on white (4.54:1)
          600: '#525252', // WCAG AA on white (7.00:1)
          700: '#404040', // WCAG AA on white (9.74:1)
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
    },
  },
}

// WCAG AA Compliance Notes:
// - Normal text requires 4.5:1 contrast ratio
// - Large text (18pt/14pt bold+) requires 3:1 contrast ratio
// - UI components require 3:1 contrast ratio
//
// Color Distinction Strategy:
// Brand uses Cyan (cool), Green (positive), Yellow (energetic) palette
// - Primary Cyan (#009FE3) vs Info Indigo (#4F46E5): Cyan is blue-green, info is purple-blue
// - Secondary Green (#16A34A) vs Success Green (#16A34A): Same shade - green represents growth and positivity
// - Accent Yellow (#FFED00) vs Warning Orange (#D97706): Yellow is bright/pure, warning is deep orange
// - Error Red (#C81E1E) stands out as the only red in the palette
// - Layout Black (#000000) for header/footer represents CMYK-K
// - This prevents confusion between brand and semantic colors
//
// Usage Guidelines:
// - Header/Footer: Use layout.header (CMYK-K #000) background with layout.text-on-dark (#fff) text
// - Body: Use layout.body (#fff) background with layout.text-on-light (#000) text
// - Logo colors: Use primary-600 (Cyan), secondary-600 (Green), accent-600 (Yellow)
// - Buttons on white: primary-600, secondary-600, or accent-600 with white text
// - Buttons on black: Use lighter shades (primary-400, secondary-400) with dark text
// - Semantic colors: Use success (green), warning (orange), error (red), info (indigo) for status
// - Always test color combinations for proper contrast
```

#### Usage in Components

```vue
<template>
  <!-- Header with black background (as per design) -->
  <header class="bg-layout-header text-layout-text-on-dark">
    <nav class="flex items-center justify-between px-6 py-4">
      <img src="/logo.svg" alt="Company Logo" />
      <!-- Navigation links - white text on black -->
      <a href="#" class="hover:text-primary-400 transition-colors"> Home </a>
    </nav>
  </header>

  <!-- Body with white background -->
  <main class="bg-layout-body text-layout-text-on-light">
    <!-- Primary button - pink from logo -->
    <button class="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-button">
      Primary Action
    </button>

    <!-- Secondary button - blue from logo -->
    <button class="bg-secondary-600 text-white hover:bg-secondary-700 px-6 py-3 rounded-button">
      Secondary Action
    </button>

    <!-- Accent/Yellow - use darker shade for WCAG compliance -->
    <button class="bg-accent-600 text-white hover:bg-accent-700 px-6 py-3 rounded-button">
      Accent Action
    </button>

    <!-- Semantic colors -->
    <div class="bg-success text-white px-4 py-2 rounded">Success Message</div>
    <div class="bg-warning text-white px-4 py-2 rounded">Warning Message</div>
    <div class="bg-error text-white px-4 py-2 rounded">Error Message</div>

    <!-- Cards on white background -->
    <div class="bg-white border border-neutral-200 rounded-card p-6">
      <h2 class="text-primary-600 font-bold text-2xl">Card Title</h2>
      <p class="text-neutral-700">Card content with good contrast</p>
    </div>
  </main>

  <!-- Footer with black background (as per design) -->
  <footer class="bg-layout-header text-layout-text-on-dark">
    <div class="px-6 py-8">
      <p>&copy; 2026 Company Name</p>
    </div>
  </footer>
</template>
```

#### Custom Fonts

Configure custom font families in the theme:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Sans', 'sans-serif', 'system-ui'],
        body: ['Inter', 'sans-serif', 'system-ui'],
      },
      fontSize: {
        // Custom font sizes if needed
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
  },
}
```

#### Font Setup in Nuxt

```vue
<!-- app.vue or layouts/default.vue -->
<script setup lang="ts">
// Load fonts from Google Fonts or local files
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap',
    },
  ],
})
</script>
```

#### Font Usage

```vue
<template>
  <!-- Default sans font -->
  <p class="font-sans text-base">Body text with Inter font</p>

  <!-- Display font for headings -->
  <h1 class="font-display text-4xl font-bold">Heading with Poppins</h1>

  <!-- Serif for special content -->
  <blockquote class="font-serif text-lg italic">Quote with Lora</blockquote>

  <!-- Mono for code -->
  <code class="font-mono text-sm"> const code = 'example' </code>

  <!-- Custom weights -->
  <p class="font-light">Light weight text</p>
  <p class="font-normal">Normal weight text</p>
  <p class="font-semibold">Semibold weight text</p>
  <p class="font-bold">Bold weight text</p>
</template>
```

#### Custom Border Radius

Define consistent border radius values across the project:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '0.125rem', // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px', // Fully rounded
        // Custom values
        button: '0.5rem', // 8px - standard button radius
        card: '1rem', // 16px - card container radius
        input: '0.375rem', // 6px - input field radius
        modal: '1.5rem', // 24px - modal dialog radius
      },
    },
  },
}
```

#### Border Radius Usage

```vue
<template>
  <!-- Standard radius values -->
  <div class="rounded">Default 4px radius</div>
  <div class="rounded-lg">Large 8px radius</div>
  <div class="rounded-2xl">Extra large 16px radius</div>
  <div class="rounded-full">Fully rounded (pills/avatars)</div>

  <!-- Custom semantic values -->
  <button class="rounded-button">Button with 8px radius</button>
  <div class="rounded-card">Card with 16px radius</div>
  <input class="rounded-input" type="text" />
  <div class="rounded-modal">Modal with 24px radius</div>

  <!-- Directional radius -->
  <div class="rounded-t-lg">Top corners rounded</div>
  <div class="rounded-b-lg">Bottom corners rounded</div>
  <div class="rounded-l-lg">Left corners rounded</div>
  <div class="rounded-r-lg">Right corners rounded</div>

  <!-- Individual corners -->
  <div class="rounded-tl-lg rounded-br-lg">Top-left and bottom-right rounded</div>

  <!-- Responsive radius -->
  <div class="rounded-md md:rounded-lg lg:rounded-xl">Responsive border radius</div>
</template>
```

#### Complete Theme Example

```typescript
// tailwind.config.ts - Full theme configuration
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fdf4ff',
          500: '#d946ef',
          600: '#c026d3',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        button: '0.5rem',
        card: '1rem',
        input: '0.375rem',
        modal: '1.5rem',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

#### Theme Best Practices

- **Consistency**: Always use theme colors instead of arbitrary values
- **Semantic naming**: Use `success`, `warning`, `error` for status colors
- **Color scales**: Provide full 50-950 scales for primary/secondary colors
- **Font loading**: Preconnect to font services for better performance
- **Variable fonts**: Consider using variable fonts to reduce file size
- **Border radius**: Use semantic names (`button`, `card`) for common patterns
- **Documentation**: Document custom theme values in README or Storybook

---

## Code Style and Formatting

### ESLint and Prettier

```json
// .eslintrc.json
{
  "extends": [
    "@nuxt/eslint-config",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "vue/multi-word-component-names": "error",
    "vue/no-v-html": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}

// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

### Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Debounce to avoid excessive API calls during typing
const debouncedSearch = useDebounceFn(search, 300)

// ✅ Good: Document complex logic
/**
 * Calculates the discounted price based on user tier and purchase amount
 *
 * @param price - Original price
 * @param userTier - User membership tier (basic, premium, vip)
 * @param quantity - Number of items purchased
 * @returns Final price after applying all discounts
 */
const calculateDiscount = (price: number, userTier: string, quantity: number): number => {
  // Implementation
}

// ❌ Bad: Stating the obvious
// Set count to 0
const count = ref(0)
```

### Import Organization

```typescript
// 1. Vue core imports
import { ref, computed, onMounted } from 'vue'

// 2. Nuxt imports
import { navigateTo, useRuntimeConfig } from '#app'

// 3. Third-party libraries
import { useForm } from 'vee-validate'
import { z } from 'zod'

// 4. Internal imports - Composables
import { useAuth } from '~/composables/useAuth'

// 5. Internal imports - Stores
import { useUserStore } from '~/stores/userStore'

// 6. Internal imports - Components
import BaseButton from '~/components/base/BaseButton.vue'

// 7. Internal imports - Types
import type { IUser, IProduct } from '~/types'

// 8. Internal imports - Utils
import { formatDate, calculateTotal } from '~/utils'
```

---

## Performance Best Practices

### Lazy Loading Components

```vue
<script setup lang="ts">
// Lazy load heavy components
const HeavyChart = defineAsyncComponent(() => import('~/components/features/HeavyChart.vue'))

const LazyModal = defineAsyncComponent(() => import('~/components/base/Modal.vue'))
</script>

<template>
  <!-- Use v-if to conditionally render -->
  <LazyModal v-if="showModal" />

  <!-- Use Suspense for loading states -->
  <Suspense>
    <template #default>
      <HeavyChart :data="chartData" />
    </template>
    <template #fallback>
      <div>Loading chart...</div>
    </template>
  </Suspense>
</template>
```

### Nuxt 3 Data Fetching

```vue
<script setup lang="ts">
// ✅ Good: Use useFetch for SSR support
const { data: products } = await useFetch('/api/products')

// ✅ Good: Use useAsyncData for complex fetching
const { data: user, refresh } = await useAsyncData('user-profile', () =>
  $fetch(`/api/users/${userId}`)
)

// ✅ Good: Lazy loading data (client-side only)
const { data: stats } = await useLazyFetch('/api/stats')

// ❌ Avoid: Regular fetch in SSR context (no hydration)
const data = await fetch('/api/products').then(r => r.json())
</script>
```

### List Rendering Optimization

```vue
<template>
  <!-- Always use :key with unique identifiers -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>

  <!-- Use v-memo for expensive list items (Vue 3.2+) -->
  <div v-for="item in items" :key="item.id" v-memo="[item.id, item.updatedAt]">
    <ExpensiveComponent :data="item" />
  </div>

  <!-- Use virtual scrolling for very long lists -->
  <RecycleScroller :items="items" :item-size="50" key-field="id">
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

### Computed vs Watch

```typescript
// ✅ Prefer computed for derived state
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// ✅ Use watch for side effects
watch(searchQuery, async newQuery => {
  await fetchSearchResults(newQuery)
})

// ❌ Avoid watch for derived state
watch([firstName, lastName], ([first, last]) => {
  fullName.value = `${first} ${last}` // Use computed instead
})
```

---

## Accessibility Standards (WCAG)

**Compliance Level**: WCAG 2.1 Level AA

All code must meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure the website is accessible to users with disabilities.

### Core Principles (POUR)

1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: User interface components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough for assistive technologies

---

### Semantic HTML

Always use semantic HTML5 elements for proper structure and meaning:

```vue
<template>
  <!-- ✅ Good: Semantic structure -->
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Page Title</h1>
      <section>
        <h2>Section Heading</h2>
        <p>Content...</p>
      </section>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Company Name</p>
  </footer>

  <!-- ❌ Bad: Non-semantic divs -->
  <div class="header">
    <div class="nav">
      <div class="nav-item">Home</div>
    </div>
  </div>
</template>
```

**Semantic Elements to Use**:

- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- `<h1>` to `<h6>` for headings (hierarchical order)
- `<button>` for interactive actions
- `<a>` for navigation links
- `<form>`, `<label>`, `<input>` for forms

---

### Heading Hierarchy

Maintain proper heading structure without skipping levels:

```vue
<template>
  <!-- ✅ Good: Proper hierarchy -->
  <h1>Main Page Title</h1>
  <section>
    <h2>Section Title</h2>
    <h3>Subsection Title</h3>
  </section>
  <section>
    <h2>Another Section</h2>
    <h3>Subsection</h3>
    <h4>Sub-subsection</h4>
  </section>

  <!-- ❌ Bad: Skipping levels -->
  <h1>Main Title</h1>
  <h3>Subsection</h3>
  <!-- Skipped h2 -->
  <h5>Detail</h5>
  <!-- Skipped h4 -->
</template>
```

**Rules**:

- Only one `<h1>` per page
- Don't skip heading levels
- Use headings for structure, not styling (use CSS for visual appearance)

---

### ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes to enhance accessibility:

```vue
<template>
  <!-- Landmark roles -->
  <nav aria-label="Main navigation">
    <!-- Navigation content -->
  </nav>

  <!-- Button with descriptive label -->
  <button aria-label="Close dialog" @click="closeDialog">
    <IconClose aria-hidden="true" />
  </button>

  <!-- Loading state -->
  <div v-if="loading" role="status" aria-live="polite">
    <span class="sr-only">Loading...</span>
  </div>

  <!-- Accordion/Disclosure -->
  <button :aria-expanded="isOpen" :aria-controls="contentId" @click="toggle">Toggle Content</button>
  <div :id="contentId" :hidden="!isOpen">Content</div>

  <!-- Modal dialog -->
  <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <h2 id="dialog-title">Dialog Title</h2>
    <!-- Dialog content -->
  </div>
</template>
```

**Common ARIA Attributes**:

- `aria-label`: Provides accessible name when visible text is unavailable
- `aria-labelledby`: References element ID that labels current element
- `aria-describedby`: References element ID that describes current element
- `aria-hidden`: Hides decorative elements from screen readers
- `aria-live`: Announces dynamic content changes
- `aria-expanded`: Indicates expanded/collapsed state
- `aria-controls`: Identifies controlled element
- `role`: Defines element's purpose (button, dialog, navigation, etc.)

**ARIA Best Practices**:

- Prefer native HTML over ARIA when possible
- Don't use ARIA on elements that have native semantics
- Test with actual screen readers

---

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```vue
<script setup lang="ts">
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    performAction()
  }
  if (event.key === 'Escape') {
    closeDialog()
  }
}

const trapFocus = (event: KeyboardEvent) => {
  // Trap focus within modal
  const focusableElements = dialog.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements?.[0] as HTMLElement
  const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement?.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement?.focus()
    }
  }
}
</script>

<template>
  <!-- Interactive div needs keyboard support -->
  <div role="button" tabindex="0" @click="handleClick" @keydown="handleKeydown">Click me</div>

  <!-- Skip to main content link -->
  <a href="#main-content" class="sr-only focus:not-sr-only"> Skip to main content </a>

  <main id="main-content">
    <!-- Main content -->
  </main>
</template>

<style>
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only.focus:not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>
```

**Keyboard Requirements**:

- All functionality available via keyboard
- Logical tab order (use `tabindex="0"` for custom interactive elements)
- Visible focus indicators
- `Enter` and `Space` activate buttons/interactive elements
- `Escape` closes dialogs/menus
- Arrow keys navigate menus and lists
- Skip navigation links for keyboard users

---

### Focus Management

Manage focus properly for better user experience:

```vue
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const modalOpen = ref(false)
const firstInputRef = ref<HTMLInputElement>()
const previousFocusElement = ref<HTMLElement | null>(null)

const openModal = async () => {
  // Store currently focused element
  previousFocusElement.value = document.activeElement as HTMLElement

  modalOpen.value = true

  // Focus first element in modal
  await nextTick()
  firstInputRef.value?.focus()
}

const closeModal = () => {
  modalOpen.value = false

  // Restore focus to previous element
  previousFocusElement.value?.focus()
}
</script>

<template>
  <!-- Focus visible styles -->
  <button
    class="outline-visible-spaced-button"
    @click="openModal"
  >
    Open Modal
  </button>

  <div v-if="modalOpen" role="dialog" aria-modal="true">
    <input ref="firstInputRef" type="text" />
    <button @click="closeModal">Close</button>
  </div>
</template>
```

**Focus Best Practices**:

- Never use `outline: none` without alternative focus indicator
- Use `:focus-visible` for keyboard-only focus styles
- Restore focus when closing modals/dialogs
- Focus first interactive element when opening modals
- Don't trap focus unintentionally

---

### Color Contrast

Meet WCAG AA color contrast requirements:

**Minimum Contrast Ratios**:

- **Normal text** (< 18pt or < 14pt bold): 4.5:1
- **Large text** (≥ 18pt or ≥ 14pt bold): 3:1
- **UI components and graphics**: 3:1

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // ✅ Good: Sufficient contrast
        primary: {
          500: '#0ea5e9', // Use on white background (contrast: 4.52:1)
          700: '#0369a1', // Use on white background (contrast: 7.53:1)
        },
        // Ensure text colors meet contrast requirements
        text: {
          primary: '#1f2937', // Gray-800 on white (contrast: 14.59:1)
          secondary: '#4b5563', // Gray-600 on white (contrast: 7.61:1)
          muted: '#6b7280', // Gray-500 on white (contrast: 5.74:1)
        },
      },
    },
  },
}
```

```vue
<template>
  <!-- ✅ Good: High contrast text -->
  <div class="bg-white text-gray-800">Primary content text</div>

  <div class="bg-primary-600 text-white">White text on colored background</div>

  <!-- ❌ Bad: Low contrast -->
  <div class="bg-gray-100 text-gray-300">Hard to read text</div>
</template>
```

**Tools**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse Accessibility Audit
- [Contrast Ratio Calculator](https://contrast-ratio.com/)

---

### Form Accessibility

Create accessible forms with proper labels and error handling:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const emailError = ref('')
const emailId = 'email-input'
const errorId = 'email-error'

const validateEmail = () => {
  if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Text input with label -->
    <div>
      <label :for="emailId" class="block text-sm font-medium">
        Email Address
        <span aria-label="required">*</span>
      </label>
      <input
        :id="emailId"
        v-model="email"
        type="email"
        required
        :aria-invalid="!!emailError"
        :aria-describedby="emailError ? errorId : undefined"
        @blur="validateEmail"
        class="mt-1 block w-full rounded-input"
      />
      <p v-if="emailError" :id="errorId" class="mt-1 text-sm text-error" role="alert">
        {{ emailError }}
      </p>
    </div>

    <!-- Radio group -->
    <fieldset>
      <legend class="text-sm font-medium">Subscription Type</legend>
      <div>
        <input id="monthly" type="radio" name="subscription" value="monthly" />
        <label for="monthly">Monthly</label>
      </div>
      <div>
        <input id="yearly" type="radio" name="subscription" value="yearly" />
        <label for="yearly">Yearly</label>
      </div>
    </fieldset>

    <!-- Checkbox with description -->
    <div>
      <input id="terms" type="checkbox" required aria-describedby="terms-description" />
      <label for="terms">I agree to the terms</label>
      <p id="terms-description" class="text-sm text-gray-600">
        By checking this box, you agree to our terms and conditions.
      </p>
    </div>

    <!-- Submit button -->
    <button type="submit" class="btn-primary" :disabled="loading" :aria-busy="loading">
      <span v-if="!loading">Submit</span>
      <span v-else>
        <span class="sr-only">Submitting form</span>
        <IconSpinner aria-hidden="true" />
      </span>
    </button>
  </form>
</template>
```

**Form Requirements**:

- Every input must have associated `<label>`
- Use `<fieldset>` and `<legend>` for grouped inputs
- Mark required fields clearly (visual + `required` attribute)
- Use `aria-invalid` and `aria-describedby` for error messages
- Error messages must be in `role="alert"` region
- Provide clear instructions and help text
- Disable autocomplete only when necessary

---

### Image Accessibility

Provide appropriate alternative text for all images:

```vue
<template>
  <!-- ✅ Informative image -->
  <img src="/chart.png" alt="Sales increased by 25% in Q4 2025" />

  <!-- ✅ Functional image (button/link) -->
  <a href="/search">
    <img src="/search-icon.svg" alt="Search" />
  </a>

  <!-- ✅ Decorative image -->
  <img src="/decorative-pattern.png" alt="" role="presentation" />

  <!-- ✅ Complex image with description -->
  <figure>
    <img
      src="/complex-chart.png"
      alt="Bar chart showing quarterly sales data"
      aria-describedby="chart-description"
    />
    <figcaption id="chart-description">
      Detailed description: Q1 $50K, Q2 $75K, Q3 $60K, Q4 $90K. Sales show 25% increase in Q4
      compared to Q3.
    </figcaption>
  </figure>

  <!-- ✅ Using Nuxt Image -->
  <NuxtImg
    src="/photo.jpg"
    alt="Team celebrating project launch at office"
    loading="lazy"
    width="800"
    height="600"
  />

  <!-- ❌ Bad: Missing alt text -->
  <img src="/important-info.png" />

  <!-- ❌ Bad: Redundant alt text -->
  <img src="/photo.jpg" alt="Image of photo" />
</template>
```

**Alt Text Guidelines**:

- **Informative images**: Describe the content/purpose
- **Functional images**: Describe the action
- **Decorative images**: Use empty alt (`alt=""`)
- **Complex images**: Provide detailed description nearby
- Keep alt text concise (< 125 characters ideally)
- Don't start with "Image of" or "Picture of"
- Include relevant text that appears in image

---

### Links and Buttons

Use appropriate elements and provide clear labels:

```vue
<template>
  <!-- ✅ Good: Descriptive link text -->
  <a href="/services"> View our printing services </a>

  <!-- ✅ Good: Button for actions -->
  <button @click="saveData">Save Changes</button>

  <!-- ✅ Good: External link indication -->
  <a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Resource
    <span class="sr-only">(opens in new window)</span>
    <IconExternalLink aria-hidden="true" class="inline" />
  </a>

  <!-- ✅ Good: Icon-only button with label -->
  <button aria-label="Delete item">
    <IconTrash aria-hidden="true" />
  </button>

  <!-- ❌ Bad: Generic link text -->
  <a href="/more">Click here</a>
  <a href="/read">Read more</a>

  <!-- ❌ Bad: Button as link -->
  <button @click="navigateTo('/page')">Go to page</button>

  <!-- ❌ Bad: Link as button -->
  <a href="#" @click.prevent="submitForm">Submit</a>
</template>
```

**Rules**:

- Use `<a>` for navigation, `<button>` for actions
- Link text must be descriptive and make sense out of context
- Avoid "click here", "read more", "learn more" without context
- Provide text alternative for icon-only buttons
- Indicate when links open in new window
- Minimum touch target size: 44x44 pixels

---

### Interactive Elements and Hover States

Ensure all functionality is accessible without requiring hover (WCAG 2.1 Success Criterion 2.5.5):

```vue
<script setup lang="ts">
import { ref } from 'vue'

const tooltipVisible = ref(false)
const previewVisible = ref(false)

const toggleTooltip = () => {
  tooltipVisible.value = !tooltipVisible.value
}

const handleAction = () => {
  console.log('Action executed')
}

const showPreview = () => {
  previewVisible.value = true
}

const hidePreview = () => {
  previewVisible.value = false
}
</script>

<template>
  <!-- ❌ Bad: Functionality only available on hover -->
  <div @mouseenter="showTooltip" @mouseleave="hideTooltip">Hover to see info</div>

  <!-- ✅ Good: Functionality available through click/tap -->
  <button @click="toggleTooltip" :aria-expanded="tooltipVisible" aria-controls="tooltip-content">
    Click to see info
  </button>
  <div v-if="tooltipVisible" id="tooltip-content" role="tooltip">Important information here</div>

  <!-- ✅ Good: Hover enhances but doesn't provide exclusive functionality -->
  <button
    @click="handleAction"
    @mouseenter="showPreview"
    @mouseleave="hidePreview"
    @focus="showPreview"
    @blur="hidePreview"
    class="hover:bg-primary-600 focus:bg-primary-600"
  >
    Action
  </button>
  <div v-if="previewVisible" class="preview">Preview content</div>

  <!-- ✅ Good: Navigation menu works with click and keyboard -->
  <nav>
    <button
      @click="toggleMenu"
      @keydown.enter="toggleMenu"
      @keydown.space.prevent="toggleMenu"
      :aria-expanded="menuOpen"
      aria-controls="dropdown-menu"
      class="hover:bg-gray-100 focus:bg-gray-100"
    >
      Menu
    </button>
    <ul v-if="menuOpen" id="dropdown-menu" role="menu">
      <li role="menuitem"><a href="/home">Home</a></li>
      <li role="menuitem"><a href="/about">About</a></li>
    </ul>
  </nav>
</template>

<style scoped>
/* Always pair hover with focus styles */
.button:hover,
.button:focus {
  background-color: theme('colors.primary.600');
}

/* ❌ Bad: Hover-only styles for critical information */
.info-hidden {
  display: none;
}
.container:hover .info-hidden {
  display: block;
}

/* ✅ Good: Use .show class toggled by click/tap */
.info-hidden {
  display: none;
}
.info-hidden.show {
  display: block;
}
</style>
```

**Rules**:

- Never hide critical information behind hover-only interactions
- Hover can enhance UX but must not be the only way to access features
- Provide click/tap alternatives for all hover interactions
- Use `:focus` states alongside `:hover` for keyboard users
- Use `:active` states for touch feedback on mobile devices
- Dropdown menus must be accessible via keyboard (Enter/Space to open, Escape to close)
- Tooltips should be toggled with click/focus, not just hover
- Test all interactions with touch devices and keyboard only
- Ensure touch targets are at least 44x44 pixels

**Common Violations to Avoid**:

- Dropdown menus that only open on hover
- Tooltips that only appear on hover
- Image galleries where controls only appear on hover
- Navigation sub-menus without click/keyboard access
- Buttons that show text labels only on hover

---

### Dynamic Content and Live Regions

Announce dynamic content changes to screen readers:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const notifications = ref<string[]>([])
const searchResults = ref<any[]>([])
const loading = ref(false)

const addNotification = (message: string) => {
  notifications.value.push(message)
}
</script>

<template>
  <!-- Toast notifications -->
  <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
    <p v-for="(notification, index) in notifications" :key="index">
      {{ notification }}
    </p>
  </div>

  <!-- Search results update -->
  <div>
    <input
      v-model="searchQuery"
      type="search"
      aria-label="Search products"
      aria-controls="search-results"
    />

    <div id="search-results" role="region" aria-live="polite" :aria-busy="loading">
      <p class="sr-only">{{ searchResults.length }} results found</p>
      <div v-for="result in searchResults" :key="result.id">
        {{ result.name }}
      </div>
    </div>
  </div>

  <!-- Loading indicator -->
  <div v-if="loading" role="status" aria-live="polite">
    <span class="sr-only">Loading content, please wait</span>
    <IconSpinner aria-hidden="true" />
  </div>
</template>
```

**ARIA Live Regions**:

- `aria-live="polite"`: Announces when user is idle (non-urgent)
- `aria-live="assertive"`: Announces immediately (urgent)
- `aria-atomic="true"`: Announces entire region, not just changes
- Use for: notifications, search results, loading states, form errors

---

### Testing for Accessibility

**Automated Testing Tools**:

```bash
# Install axe-core for automated testing
npm install -D @axe-core/vue vitest-axe
```

```typescript
// tests/component.test.ts
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import MyComponent from '~/components/MyComponent.vue'

test('should have no accessibility violations', async () => {
  const wrapper = mount(MyComponent)
  const results = await axe(wrapper.element)
  expect(results).toHaveNoViolations()
})
```

**Manual Testing Checklist**:

- [ ] Navigate entire site using only keyboard (Tab, Enter, Escape)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast with tools
- [ ] Zoom to 200% and verify layout doesn't break
- [ ] Disable images and verify alt text
- [ ] Test forms with validation and error messages
- [ ] Verify focus indicators are visible
- [ ] Check heading hierarchy with HeadingsMap extension
- [ ] Test with browser extensions (axe DevTools, WAVE)

**Browser Extensions**:

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (built into Chrome)
- [HeadingsMap](https://chromewebstore.google.com/detail/headingsmap)

**Screen Readers**:

- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **iOS**: VoiceOver (built-in)
- **Android**: TalkBack (built-in)

---

### WCAG 2.1 AA Checklist

**Perceivable**:

- [ ] All images have appropriate alt text
- [ ] Color is not the only visual means of conveying information
- [ ] Text has sufficient contrast (4.5:1 for normal, 3:1 for large)
- [ ] Content adapts to 200% zoom without loss of functionality
- [ ] Audio/video has captions and transcripts

**Operable**:

- [ ] All functionality available from keyboard
- [ ] No keyboard traps
- [ ] Visible focus indicators on all interactive elements
- [ ] Adequate time to read and use content
- [ ] Page has descriptive title
- [ ] Focus order is logical and intuitive
- [ ] Link purpose clear from link text or context
- [ ] Multiple ways to navigate (menu, search, sitemap)

**Understandable**:

- [ ] Language of page is identified (`lang` attribute)
- [ ] Labels and instructions provided for forms
- [ ] Error messages are clear and helpful
- [ ] Navigation is consistent across pages
- [ ] Components behave consistently

**Robust**:

- [ ] Valid HTML (no major errors)
- [ ] ARIA used correctly
- [ ] Compatible with assistive technologies
- [ ] Status messages can be programmatically determined

---

## Git Workflow

### Branch Naming

```
main                         - Production-ready code
develop                      - Integration branch (optional)
123-add-user-authentication  - Feature branch (using issue number)
124-fix-login-error          - Bug fix branch
improve-store-performance    - Refactoring/improvement branch
```

**Tips:**

- Use GitHub's "Create branch" from issues for automatic naming
- Keep branch names lowercase with hyphens
- Include issue number when available (e.g., `123-feature-name`)
- Be descriptive but concise

### Commit Messages

```
feat: add user authentication with JWT
fix: resolve navigation bug on mobile
refactor: optimize user store performance
docs: update API documentation
style: format code with prettier
test: add unit tests for auth composable
chore: update dependencies
```

### Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] All TypeScript types are properly defined
- [ ] Components are properly documented
- [ ] No console.logs in production code
- [ ] Responsive design tested on all breakpoints
- [ ] No ESLint errors or warnings
- [ ] Code has been reviewed by at least one team member
- [ ] Lighthouse performance is still ok

---

## Additional Resources

### Recommended VS Code Extensions

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag
- Path Intellisense

### Useful Links

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

**Last Updated**: December 30, 2025
**Version**: 1.0.0
