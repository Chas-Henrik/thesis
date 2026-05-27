<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseDropDown from '~/components/base/BaseDropdown.vue'

interface Props {
  modelValue?: {
    location: string
    employmentType: string
    workingHours: string
  }
  locations?: string[]
  employmentTypes?: string[]
  workingHoursTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    location: '',
    employmentType: '',
    workingHours: '',
  }),
  locations: () => [],
  employmentTypes: () => [],
  workingHoursTypes: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

// State
const selectedLocation = ref(props.modelValue.location)
const selectedEmploymentType = ref(props.modelValue.employmentType)
const selectedWorkingHours = ref(props.modelValue.workingHours)

// Template refs for dropdowns
const locationDropdown = ref<InstanceType<typeof BaseDropDown> | null>(null)
const employmentTypeDropdown = ref<InstanceType<typeof BaseDropDown> | null>(null)
const workingHoursDropdown = ref<InstanceType<typeof BaseDropDown> | null>(null)

// Computed labels
const locationLabel = computed(() => selectedLocation.value || 'Location (City)')
const employmentTypeLabel = computed(() => selectedEmploymentType.value || 'Employment Type')
const workingHoursLabel = computed(() => selectedWorkingHours.value || 'Working Hours')

// Methods
const handleLocationSelect = (location: string): void => {
  selectedLocation.value = location
  emitUpdate()
  locationDropdown.value?.closeDropdown()
}

const handleEmploymentTypeSelect = (type: string): void => {
  selectedEmploymentType.value = type
  emitUpdate()
  employmentTypeDropdown.value?.closeDropdown()
}

const handleWorkingHoursSelect = (hours: string): void => {
  selectedWorkingHours.value = hours
  emitUpdate()
  workingHoursDropdown.value?.closeDropdown()
}

const handleResetFilters = (): void => {
  selectedLocation.value = ''
  selectedEmploymentType.value = ''
  selectedWorkingHours.value = ''

  locationDropdown.value?.closeDropdown()
  employmentTypeDropdown.value?.closeDropdown()
  workingHoursDropdown.value?.closeDropdown()

  emitUpdate()
}

const emitUpdate = (): void => {
  emit('update:modelValue', {
    location: selectedLocation.value,
    employmentType: selectedEmploymentType.value,
    workingHours: selectedWorkingHours.value,
  })
}
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Filter Title -->
    <h2 class="text-lg font-semibold text-slate-950">Filter Results</h2>

    <!-- Filters Grid -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Location Dropdown -->
        <BaseDropDown
          ref="locationDropdown"
          :label="locationLabel"
        >
          <template #dropdown>
            <button
              v-for="location in props.locations"
              :key="location"
              type="button"
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-150"
              :aria-label="`Filter by location: ${location}`"
              @click="handleLocationSelect(location)"
            >
              {{ location }}
            </button>
          </template>
        </BaseDropDown>

        <!-- Employment Type Dropdown -->
        <BaseDropDown
          ref="employmentTypeDropdown"
          :label="employmentTypeLabel"
        >
          <template #dropdown>
            <button
              v-for="type in props.employmentTypes"
              :key="type"
              type="button"
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-150"
              :aria-label="`Filter by employment type: ${type}`"
              @click="handleEmploymentTypeSelect(type)"
            >
              {{ type }}
            </button>
          </template>
        </BaseDropDown>

        <!-- Working Hours Type Dropdown -->
        <BaseDropDown
          ref="workingHoursDropdown"
          :label="workingHoursLabel"
        >
          <template #dropdown>
            <button
              v-for="hours in props.workingHoursTypes"
              :key="hours"
              type="button"
              class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-150"
              :aria-label="`Filter by working hours: ${hours}`"
              @click="handleWorkingHoursSelect(hours)"
            >
              {{ hours }}
            </button>
          </template>
        </BaseDropDown>
      </div>

      <button
        type="button"
        class="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        @click="handleResetFilters"
      >
        Reset filters
      </button>
    </div>
  </div>
</template>
