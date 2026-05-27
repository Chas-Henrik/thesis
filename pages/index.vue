<script setup lang="ts">
import { ref } from 'vue'
import AdList from '~/components/features/AdList.vue'
import DBForm from '~/components/features/DbForm.vue'
import FilterMenu from '~/components/features/FilterMenu.vue'
import CvAnalysisForm from '~/components/features/CvAnalysisForm.vue'
import KeywordSearch from '~/components/features/KeywordSearch.vue'

const locations = ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås']
const employmentTypes = ['Permanent Position', 'Fixed-term Contract', 'Temporary Assignment', 'On-call or Temporary Position', 'Summer Job', 'Internship']
const workingHoursTypes = ['Full-time (40h)', 'Part-time (20-30h)', 'Hourly Employment']
const mockAds = [
  {
    title: 'Frontend Developer (Vue/Nuxt)',
    description: 'Join a product team building modern web interfaces with Vue and Nuxt. You will collaborate with designers and backend engineers to create fast and accessible user experiences.',
    link: 'https://arbetsformedlingen.se/platsbanken/annonser/1001',
  },
  {
    title: 'Data Engineer (ETL Pipelines)',
    description: 'Design and maintain ETL pipelines that process large datasets from multiple sources. Experience with SQL, Python, and cloud infrastructure is a plus.',
    link: 'https://arbetsformedlingen.se/platsbanken/annonser/1002',
  },
  {
    title: 'UX Designer - Mobile and Web',
    description: 'Drive UX research and interaction design for a digital service platform. You will own wireframing, prototyping, and usability testing across key user flows.',
    link: 'https://arbetsformedlingen.se/platsbanken/annonser/1003',
  },
]

// State
const searchResult = ref<unknown>(null)
const keywordSearchResults = ref<unknown>(null)

const filterValues = ref({
  location: '',
  employmentType: '',
  workingHours: '',
})

// Methods
const handleFilterUpdate = (newValues: typeof filterValues.value): void => {
  filterValues.value = newValues
  console.log('Filter Updated:')
  console.log('Location:', newValues.location)
  console.log('Employment Type:', newValues.employmentType)
  console.log('Working Hours:', newValues.workingHours)
}

const handleKeywordSearch = (query: string, results: unknown): void => {
  keywordSearchResults.value = results
  const resultCount = Array.isArray(results) ? results.length : ''
  console.log('Keyword search:', query)
  console.log(`${resultCount} matches:`, results)
}

const handleCvAnalysisResult = (result: unknown): void => {
  searchResult.value = result
}

</script>

<template>
  <main class="min-h-screen bg-white text-slate-950">
    <div class="mx-auto w-full max-w-7xl px-6 py-10">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <section class="space-y-6">
          <CvAnalysisForm @result="handleCvAnalysisResult" />

          <FilterMenu
            :model-value="filterValues"
            :locations="locations"
            :employment-types="employmentTypes"
            :working-hours-types="workingHoursTypes"
            @update:model-value="handleFilterUpdate"
          />
        </section>

        <section aria-hidden="true" class="min-h-[1px]" />

        <section>
          <DBForm />
        </section>

        <section class="lg:col-span-3">
          <AdList :ads="mockAds" />
        </section>
      </div>

    </div>
  </main>
</template>
