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
  extends: ['fin-ready', 'mdul-lineoa', 'mdul-loanfast', 'mdul-member', 'mdul-newmembership'],

  runtimeConfig: {
    // apiServer: {
    //   baseURL: 'http://localhost:3086',
    // },
    liveSync: {
      ablyKey: 'NUXT_LIVE_SYNC_ABLY_KEY',
    },
  },
});
