<script setup lang="ts">
import { ref } from 'vue'
import DBForm from '~/components/features/DbForm.vue'
import FilterMenu from '~/components/features/FilterMenu.vue'
import CvAnalysisForm from '~/components/features/CvAnalysisForm.vue';

const locations = ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås']
const employmentTypes = ['Permanent Position', 'Fixed-term Contract', 'Temporary Assignment', 'On-call or Temporary Position', 'Summer Job', 'Internship']
const workingHoursTypes = ['Full-time (40h)', 'Part-time (20-30h)', 'Hourly Employment']

// State
const searchResult = ref<unknown>(null)

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

</script>

<template>
  <main class="min-h-screen bg-white text-slate-950">
    <div class="mx-auto grid min-h-screen w-full grid-cols-3 items-center gap-8 px-6 py-16">
      <div class="w-full">      
        <CvAnalysisForm @result="searchResult = $event" />
        <FilterMenu
          :model-value="filterValues"
          :locations="locations"
          :employment-types="employmentTypes"
          :working-hours-types="workingHoursTypes"
          @update:model-value="handleFilterUpdate"
        />
      </div>
      <div />
      <DBForm />

    </div>
  </main>
</template>
