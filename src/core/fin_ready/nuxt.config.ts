// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  extends: ['fin-theme', 'fin-app-extra'],
  runtimeConfig: {
    apiServer: {
      baseURL: 'https://devdata-gxd7b0aub3eufaf8.southeastasia-01.azurewebsites.net/',
    },
    liveSync: {
      ablyKey: 'NUXT_LIVE_SYNC_ABLY_KEY',
    },
  },
});
