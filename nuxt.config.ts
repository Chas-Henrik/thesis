// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  nitro: {
    esbuild: {
      options: {
        target: 'ES2020',
      },
    },
  },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    jobSearchApiUrl: process.env.JOB_SEARCH_API_URL || 'https://jobsearch.api.jobtechdev.se/search',
    jobSearchApiLimit: process.env.JOB_SEARCH_API_LIMIT || '10',
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
    },
  },
})
