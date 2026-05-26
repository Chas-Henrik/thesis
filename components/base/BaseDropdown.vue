<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  label: string
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits<{
  toggle: []
  close: []
}>()

// State
const isDropdownOpen = ref(false)

// Methods
const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value
  emit('toggle')
}

const closeDropdown = (): void => {
  isDropdownOpen.value = false
  emit('close')
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

// Lifecycle
onMounted(() => {
  if (props.isOpen) {
    isDropdownOpen.value = true
  }
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

// Expose methods to parent components
defineExpose({
  closeDropdown,
})
</script>

<template>
  <div class="relative inline-block w-full">
    <!-- Dropdown button -->
    <button
      type="button"
      aria-haspopup="true"
      :aria-expanded="isDropdownOpen"
      :aria-label="`${label} dropdown menu`"
      @click="toggleDropdown"
      class="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-150"
    >
      <!-- Label text on the left -->
      <span class="text-gray-700 font-medium">{{ label }}</span>

      <!-- Chevron icon on the right -->
      <svg
        :class="[
          'w-5 h-5 text-gray-500 transition-transform duration-200',
          isDropdownOpen && 'rotate-180',
        ]"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isDropdownOpen"
        class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
        role="menu"
        aria-orientation="vertical"
      >
        <slot name="dropdown">
          <!-- Default slot for dropdown items -->
          <div class="px-4 py-2 text-gray-600 text-sm">No items available</div>
        </slot>
      </div>
    </transition>

    <!-- Overlay to close dropdown when clicking outside -->
    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 z-0"
      @click="closeDropdown"
      aria-hidden="true"
    ></div>
  </div>
</template>
