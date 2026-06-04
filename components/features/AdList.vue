<script setup lang="ts">
import { computed, ref } from 'vue'

export interface AdListItem {
  title: string
  employer_name: string
  description: string
  link: string
  date:string
  similarity_score?: number
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

// Watchers
watch(() => props.ads, () => {
  selectedIndex.value = 0
})

// Computed
const selectedAd = computed<AdListItem | null>(() => props.ads[selectedIndex.value] ?? null)
const hasAds = computed<boolean>(() => props.ads.length > 0)
const selectedAdDate = computed<string>(() => selectedAd.value?.date.replace('T', ' ') ?? '')

// Methods
const handleSelectAd = (index: number): void => {
  selectedIndex.value = index
}
</script>

<template>
  <section class="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <h2 class="text-lg font-semibold text-slate-950">Job Ads</h2>

    <div v-if="hasAds" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,19rem)_1fr]">
      <div class="h-full overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
        <ul class="space-y-2">
          <li v-for="(ad, index) in props.ads" :key="`${ad.link}-${index}`">
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-md border px-3 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              :class="index === selectedIndex ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100'"
              :aria-pressed="index === selectedIndex"
              @click="handleSelectAd(index)"
            >
              <span class="min-w-0 flex-1 text-sm font-semibold" style="word-break: break-word; overflow-wrap: break-word;">{{ ad.title }}</span>
              <span
                v-if="ad.similarity_score"
                class="shrink-0 rounded-full bg-yellow-300 px-2 py-0.5 text-xs font-semibold text-slate-900"
              >
                {{ (ad.similarity_score * 100).toFixed(2) }}%
              </span>
            </button>
          </li>
        </ul>
      </div>

      <article class="rounded-lg border border-slate-200 bg-white p-4 sm:p-5" aria-live="polite">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold text-slate-950">{{ selectedAd?.title }}</h3>
          <span class="shrink-0 text-sm text-slate-500">{{ selectedAdDate }}</span>
        </div>
        <h4 class="text-xl font-semibold text-blue-600 mt-2">{{ selectedAd?.employer_name }}</h4>
        <p class="mt-3 whitespace-pre-line text-base leading-6 text-slate-700" style="word-break: break-word; overflow-wrap: break-word;">{{ selectedAd?.description }}</p>
        <a
          :href="selectedAd?.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Link to Arbetsförmedlingen
        </a>
      </article>
    </div>

    <p v-else class="mt-4 text-base text-slate-600">No ads available.</p>
  </section>
</template>