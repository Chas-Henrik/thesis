import { ref, onMounted } from 'vue'

interface DBFormResponse {
  fromDate?: string
  toDate?: string
}

export const useDBForm = () => {
  const fromDate = ref<string>('')
  const toDate = ref<string>('')
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const submitting = ref<boolean>(false)
  const success = ref<boolean>(false)

  /**
   * Fetch initial date values from the backend
   */
  const fetchInitialDates = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<DBFormResponse>('/api/settings/job-import')
      if (response) {
        fromDate.value = response.fromDate || ''
        toDate.value = response.toDate || ''
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dates'
      error.value = errorMessage
      console.error('[useDBForm] Error fetching dates:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Submit form data to the backend
   */
  const submitForm = async (): Promise<void> => {
    submitting.value = true
    error.value = null
    success.value = false

    try {
      await $fetch('/api/settings/job-import', {
        method: 'POST',
        body: {
          fromDate: fromDate.value,
          toDate: toDate.value,
        },
      })
      success.value = true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to import database'
      error.value = errorMessage
      console.error('[useDBForm] Error submitting form:', err)
    } finally {
      submitting.value = false
    }
  }

  /**
   * Initialize on component mount
   */
  onMounted(() => {
    void fetchInitialDates()
  })

  return {
    fromDate,
    toDate,
    loading,
    error,
    success,
    submitting,
    submitForm,
  }
}
