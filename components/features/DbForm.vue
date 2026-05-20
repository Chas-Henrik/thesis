<script setup lang="ts">
import { computed } from 'vue'
import { useDBForm } from '~/composables/useDbForm'

// Composables
const { fromDate, toDate, loading, error, success, submitting, submitForm } = useDBForm()

// Computed
const isSubmitDisabled = computed<boolean>(() => {
  return loading.value || submitting.value || !fromDate.value || !toDate.value
})

const hasErrors = computed<boolean>(() => {
  return error.value !== null
})

const maxDate = computed<string>(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

// Methods
const handleSubmit = async (): Promise<void> => {
  await submitForm()
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full max-w-xs rounded-lg border border-slate-300 bg-white p-6 shadow-sm"
    novalidate
  >
    <!-- Form Title -->
    <h2 class="mb-6 text-lg font-semibold text-slate-950">Import Database</h2>

    <!-- From Date Field -->
    <div class="mb-4">
      <label for="from-date" class="block text-sm font-medium text-slate-700"> From date <span class="text-red-600">*</span> </label>
      <input
        id="from-date"
        v-model="fromDate"
        type="date"
        required
        :disabled="loading || submitting"
        :max="maxDate"
        class="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm transition-colors focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 disabled:bg-slate-100 disabled:text-slate-500"
      />
    </div>

    <!-- To Date Field -->
    <div class="mb-6">
      <label for="to-date" class="block text-sm font-medium text-slate-700"> To date <span class="text-red-600">*</span> </label>
      <input
        id="to-date"
        v-model="toDate"
        type="date"
        required
        :disabled="loading || submitting"
        :max="maxDate"
        class="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm transition-colors focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 disabled:bg-slate-100 disabled:text-slate-500"
      />
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="isSubmitDisabled"
      :aria-busy="submitting"
      class="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
    >
      <span v-if="!submitting">Import DB</span>
      <span v-else>Importing...</span>
    </button>

    <!-- Loading State -->
    <p v-if="loading" class="mt-2 text-xs text-slate-500">Loading initial dates...</p>

    <!-- Error Message -->
    <div
      v-if="hasErrors"
      role="alert"
      aria-live="polite"
      class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <!-- Success Message -->
    <div
      v-if="success"
      role="status"
      aria-live="polite"
      class="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700"
    >
      Database import completed successfully
    </div>
  </form>
</template>
