<script setup lang="ts">
import { ref, computed } from 'vue'
import AdList, { type AdListItem } from '~/components/features/AdList.vue'
import DBForm from '~/components/features/DbForm.vue'
import FilterMenu from '~/components/features/FilterMenu.vue'
import CvAnalysisForm from '~/components/features/CvAnalysisForm.vue'
import KeywordSearch from '~/components/features/KeywordSearch.vue'

interface KeywordSearchJob {
  title: string
  description: string
  job_link: string | null
  location: string | null
  employment_type: string | null
  working_hours_type: string | null
  employer_name: string | null
  date: string | null
}

// State
const searchResult = ref<unknown>(null)
const keywordSearchJobs = ref<KeywordSearchJob[]>([])

const filterValues = ref({
  location: '',
  employmentType: '',
  workingHours: '',
})

// Computed
const locations = computed<string[]>(() =>
  [...new Set(keywordSearchJobs.value.map(j => j.location).filter((v): v is string => v !== null))]
    .sort((a, b) => a.localeCompare(b, 'sv'))
)

const employmentTypes = computed<string[]>(() =>
  [...new Set(keywordSearchJobs.value.map(j => j.employment_type).filter((v): v is string => v !== null))]
)

const workingHoursTypes = computed<string[]>(() =>
  [...new Set(keywordSearchJobs.value.map(j => j.working_hours_type).filter((v): v is string => v !== null))]
)

const keywordSearchResults = computed<AdListItem[]>(() =>
  keywordSearchJobs.value
    .filter((job) => {
      const matchesLocation = !filterValues.value.location || job.location === filterValues.value.location
      const matchesEmploymentType = !filterValues.value.employmentType || job.employment_type === filterValues.value.employmentType
      const matchesWorkingHours = !filterValues.value.workingHours || job.working_hours_type === filterValues.value.workingHours

      return matchesLocation && matchesEmploymentType && matchesWorkingHours
    })
    .map(job => ({
      title: job.title,
      description: job.description,
      link: job.job_link ?? '#',
      employer_name: job.employer_name ?? 'Unknown',
      date: job.date ?? 'Unknown',
    }))
)

// Methods
const handleFilterUpdate = (newValues: typeof filterValues.value): void => {
  filterValues.value = newValues
  console.log('Filter Updated:')
  console.log('Location:', newValues.location)
  console.log('Employment Type:', newValues.employmentType)
  console.log('Working Hours:', newValues.workingHours)
}

const handleKeywordSearch = (query: string, results: KeywordSearchJob[]): void => {
  keywordSearchJobs.value = results
  console.log('Keyword search:', query)
  console.log(`${results.length} matches:`, results)
}

const handleCvAnalysisResult = (result: unknown): void => {
  searchResult.value = result
}

</script>

<template>
  <main class="min-h-screen bg-white text-slate-950">
    <div class="mx-auto w-full max-w-7xl px-6 py-10">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <CvAnalysisForm @result="handleCvAnalysisResult" />


        <section class="space-y-6">
          <KeywordSearch @search="handleKeywordSearch" />
        </section>

        <section class="space-y-6">
          <DBForm />
        </section>
        
          <FilterMenu
            :model-value="filterValues"
            :locations="locations"
            :employment-types="employmentTypes"
            :working-hours-types="workingHoursTypes"
            @update:model-value="handleFilterUpdate"
            class="col-span-1 md:col-span-2 lg:col-span-3"
          />

        <section class="md:col-span-2 lg:col-span-3">
          <AdList :ads="keywordSearchResults" />
        </section>
      </div>

    </div>
  </main>
</template>
