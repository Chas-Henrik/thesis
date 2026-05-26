<script setup lang="ts">
import CvDropZone from '~/components/features/CvDropZone.vue'
import BaseDropdown from '~/components/base/BaseDropdown.vue'

// Emits
const emit = defineEmits<{
  result: [data: unknown]
}>()

// State
const cvFile = ref<File | null>(null)
const cvSearchOption = ref<string>('Extracted CV')
const adSearchOption = ref<string>('Extracted Ad')
const submitting = ref(false)
const errorMessage = ref<string | null>(null)
const success = ref(false)

const cvDropdownRef = ref<InstanceType<typeof BaseDropdown> | null>(null)
const adDropdownRef = ref<InstanceType<typeof BaseDropdown> | null>(null)

const cvOptions = ['Extracted CV', 'Raw CV Info']
const adOptions = ['Extracted Ad', 'Raw Ad Info']

// Computed
const isSubmitDisabled = computed(() => !cvFile.value || submitting.value)

// Methods
function selectCvOption(option: string) {
  cvSearchOption.value = option
  cvDropdownRef.value?.closeDropdown()
}

function selectAdOption(option: string) {
  adSearchOption.value = option
  adDropdownRef.value?.closeDropdown()
}

async function handleSubmit() {
  errorMessage.value = null
  success.value = false
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('file', cvFile.value!)
    formData.append('cvSearchOption', cvSearchOption.value)
    formData.append('adSearchOption', adSearchOption.value)

    const response = await $fetch('/api/search/semantic', {
      method: 'POST',
      body: formData,
    })
    emit('result', response)
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
        <label class="mb-1 block text-sm font-medium text-slate-700">
          CV Search Options <span class="text-red-600">*</span>
        </label>
        <BaseDropdown ref="cvDropdownRef" :label="cvSearchOption" :disabled="submitting">
          <template #dropdown>
            <ul role="menu">
              <li
                v-for="option in cvOptions"
                :key="option"
                role="menuitem"
                class="cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                :class="{ 'font-medium text-slate-950': option === cvSearchOption }"
                @click="selectCvOption(option)"
              >
                {{ option }}
              </li>
            </ul>
          </template>
        </BaseDropdown>
      </div>

      <div class="flex-1">
        <label class="mb-1 block text-sm font-medium text-slate-700">
          Ad Search Options <span class="text-red-600">*</span>
        </label>
        <BaseDropdown ref="adDropdownRef" :label="adSearchOption" :disabled="submitting">
          <template #dropdown>
            <ul role="menu">
              <li
                v-for="option in adOptions"
                :key="option"
                role="menuitem"
                class="cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                :class="{ 'font-medium text-slate-950': option === adSearchOption }"
                @click="selectAdOption(option)"
              >
                {{ option }}
              </li>
            </ul>
          </template>
        </BaseDropdown>
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

