// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@vueuse/nuxt', 'nuxt-auth-utils'],
  // routeRules: {
  //   '/api/fin-app/**': {
  //     proxy: 'http://20.247.175.13:3086/api/fin-app/**',
  //   },
  // },
});