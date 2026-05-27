<script setup lang="ts">
interface Job {
  id: string
  title: string
  location: string | null
  date: string | null
  description: string
  job_link: string | null
  employer_name: string | null
  employment_type: string | null
  working_hours_type: string | null
  af_job_id: string
}

interface SearchResult {
  success: boolean
  data: Job[]
  error?: string
}

interface Props {
  // Optional: initial search query
  initialQuery?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  search: [query: string, results: Job[]]
}>()

const searchQuery = ref<string>('')
const isSearching = ref<boolean>(false)

/**
 * Handles the search operation
 * Makes a POST request to the backend and emits results
 */
async function handleSearch(): Promise<void> {
  const query = searchQuery.value.trim()

  if (!query) {
    return
  }

  isSearching.value = true

  try {
    const response = await $fetch<SearchResult>('/api/search/keyword', {
      method: 'GET',
      query: {
        query,
      },
    })

    if (response.success) {
      emit('search', query, response.data)
    } else {
      console.error('Search failed:', response.error)
    }
  } catch (error) {
    console.error('Search request failed:', error)
  } finally {
    isSearching.value = false
  }
}

onMounted(() => {
  if (props.initialQuery) {
    searchQuery.value = props.initialQuery
  }
})
</script>

<template>
  <form @submit.prevent="handleSearch" class="w-full">
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by keyword..."
          :disabled="isSearching"
          class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          aria-label="Search jobs by keyword"
          @keydown.enter="handleSearch"
        />
      </div>

      <button
        type="submit"
        :disabled="isSearching || !searchQuery.trim()"
        class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
        :aria-busy="isSearching"
        aria-label="Search"
      >
        <div v-if="isSearching" class="flex items-center gap-2">
          <svg
            class="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span class="text-sm">Searching...</span>
        </div>
        <svg
          v-else
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Smooth transitions for input states */
input:disabled {
  opacity: 0.6;
}

button:disabled {
  opacity: 0.6;
}
</style>
