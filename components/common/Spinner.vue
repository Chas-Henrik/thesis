<script setup lang="ts">
/**
 * Spinner Component
 * @description Shows a spinner for button or page loading states
 */

interface Props {
  type?: 'button' | 'page'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
})
</script>

<template>
  <span class="inline-block">
    <span
      v-if="props.type === 'button'"
      class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <span
      v-else
      class="inline-block h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px] animate-spin rounded-full border-[12px] sm:border-[14px] lg:border-[16px] border-primary-500 border-t-transparent"
      aria-hidden="true"
    />
    <span class="sr-only">Loading...</span>
  </span>
</template>