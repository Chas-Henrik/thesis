<script setup lang="ts">
import CvDropZone from '~/components/features/CvDropZone.vue'

// State
const cvFile = ref<File | null>(null)
const cvSearchOption = ref<string>('Extracted CV')
const adSearchOption = ref<string>('Extracted Ad')
const submitting = ref(false)
const errorMessage = ref<string | null>(null)
const success = ref(false)

// Computed
const isSubmitDisabled = computed(() => !cvFile.value || submitting.value)

// Methods
async function handleSubmit() {
  errorMessage.value = null
  success.value = false
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('file', cvFile.value!)
    formData.append('cvSearchOption', cvSearchOption.value)
    formData.append('adSearchOption', adSearchOption.value)

    await $fetch('/api/search/semantic', {
      method: 'POST',
      body: formData,
    })
    success.value = true
  }
  catch (error) {
    const fetchError = error as { statusMessage?: string }
    errorMessage.value = fetchError.statusMessage ?? 'Something went wrong. Please try again.'
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <form
    novalidate
    class="w-full max-w-lg rounded-xl border border-slate-300 bg-white p-6 shadow-sm"
    @submit.prevent="handleSubmit"
  >
    <!-- CV Upload -->
    <div class="mb-6">
      <CvDropZone v-model="cvFile" />
    </div>

    <!-- Dropdowns -->
    <div class="mb-6 flex gap-4">
      <div class="flex-1">
        <label for="dropdown-one" class="block text-sm font-medium text-slate-700">
          CV Search Options <span class="text-red-600">*</span>
        </label>
        <select
          id="dropdown-one"
          v-model="cvSearchOption"
          required
          :disabled="submitting"
          class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm transition-colors focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 disabled:bg-slate-100 disabled:text-slate-500"
        >
          <option value="Extracted CV">Extracted CV</option>
          <option value="Raw CV Info">Raw CV Info</option>
        </select>
      </div>

      <div class="flex-1">
        <label for="dropdown-two" class="block text-sm font-medium text-slate-700">
          Ad Search Options <span class="text-red-600">*</span>
        </label>
        <select
          id="dropdown-two"
          v-model="adSearchOption"
          required
          :disabled="submitting"
          class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm transition-colors focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 disabled:bg-slate-100 disabled:text-slate-500"
        >
          <option value="Extracted Ad">Extracted Ad</option>
          <option value="Raw Ad Info">Raw Ad Info</option>
        </select>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="isSubmitDisabled"
      :aria-busy="submitting"
      class="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {{ submitting ? 'Searching…' : 'Search' }}
    </button>
  </form>
</template>
