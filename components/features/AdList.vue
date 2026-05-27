<script setup lang="ts">
import { computed, ref } from 'vue'

export interface AdListItem {
  title: string
  description: string
  link: string
}

interface Props {
  ads?: AdListItem[]
}

// Props & Emits
const props = withDefaults(defineProps<Props>(), {
  ads: () => [],
})

// State (ref/reactive)
const selectedIndex = ref<number>(0)

// Computed
const selectedAd = computed<AdListItem | null>(() => props.ads[selectedIndex.value] ?? null)
const hasAds = computed<boolean>(() => props.ads.length > 0)

// Methods
const handleSelectAd = (index: number): void => {
  selectedIndex.value = index
}
</script>

<template>
  <section class="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <h2 class="text-lg font-semibold text-slate-950">Job Ads</h2>

    <div v-if="hasAds" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,19rem)_1fr]">
      <div class="max-h-[28rem] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
        <ul class="space-y-2">
          <li v-for="(ad, index) in props.ads" :key="`${ad.link}-${index}`">
            <button
              type="button"
              class="w-full rounded-md border px-3 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              :class="index === selectedIndex ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100'"
              :aria-pressed="index === selectedIndex"
              @click="handleSelectAd(index)"
            >
              <span class="block text-sm font-semibold">{{ ad.title }}</span>
            </button>
          </li>
        </ul>
      </div>

      <article class="rounded-lg border border-slate-200 bg-white p-4 sm:p-5" aria-live="polite">
        <h3 class="text-base font-semibold text-slate-950">{{ selectedAd?.title }}</h3>
        <p class="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{{ selectedAd?.description }}</p>
        <a
          :href="selectedAd?.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Open original ad
        </a>
      </article>
    </div>

    <p v-else class="mt-4 text-sm text-slate-600">No ads available.</p>
  </section>
</template>