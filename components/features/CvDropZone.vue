<script setup lang="ts">
// Props & Emits
interface Props {
  modelValue: File | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

const emit = defineEmits<{
  'update:modelValue': [file: File | null]
}>()

// State
const isDragOver = ref(false)
const errorMessage = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Methods
function handleDrop(event: DragEvent) {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0] ?? null
  setFile(file)
}

function handleFileInput(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] ?? null
  setFile(file)
}

function setFile(file: File | null) {
  errorMessage.value = null
  if (!file) return
  if (file.type !== 'application/pdf') {
    errorMessage.value = 'Only PDF files are accepted.'
    return
  }

  emit('update:modelValue', file)
}

function removeFile() {
  emit('update:modelValue', null)
  errorMessage.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}

function openFilePicker() {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="w-full">
    <!-- Drop zone (always visible) -->
    <div
      role="button"
      tabindex="0"
      :aria-label="isDragOver ? 'Release to upload PDF' : props.modelValue ? 'Drop to replace CV' : 'Drop your CV here or click to browse'"
      class="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 transition-colors"
      :class="isDragOver
        ? 'border-slate-500 bg-slate-50'
        : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="openFilePicker"
      @keydown.enter.prevent="openFilePicker"
      @keydown.space.prevent="openFilePicker"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div>
        <p class="text-sm font-medium text-slate-700">
          <template v-if="props.modelValue">Drop to replace or <span class="text-slate-900 underline">browse</span></template>
          <template v-else>Drop your CV here or <span class="text-slate-900 underline">browse</span></template>
        </p>
        <p class="mt-1 text-xs text-slate-400">PDF only</p>
      </div>
    </div>

    <!-- Selected file -->
    <div
      v-if="props.modelValue"
      class="mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="truncate text-sm text-slate-700">{{ props.modelValue.name }}</span>
      </div>
      <button
        type="button"
        aria-label="Remove file"
        class="ml-4 shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        @click="removeFile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Error -->
    <p v-if="errorMessage" role="alert" class="mt-2 text-xs text-red-500">{{ errorMessage }}</p>

    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      accept="application/pdf"
      class="sr-only"
      aria-hidden="true"
      tabindex="-1"
      @change="handleFileInput"
    />
  </div>
</template>
