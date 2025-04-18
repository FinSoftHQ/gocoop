// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    inlineRouteRules: true,
  },
  extends: ['fin-ready', 'mdul-counterloanfast', 'mdul-counterregister', 'mdul-counterverify', 'mdul-finance', 'mdul-salarycheck', 'mdul-deduction'],

  runtimeConfig: {
    // apiServer: {
    //   baseURL: 'http://localhost:3086',
    // },
    liveSync: {
      ablyKey: 'NUXT_LIVE_SYNC_ABLY_KEY',
    },
  },
});
