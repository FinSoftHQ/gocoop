// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  extends: ['@finsoft/fin-app-core', '@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-og-image',
    '@pinia/nuxt',
  ],

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) =>
        ['UButton'].includes(c.pascalName)
      );

      globals.forEach((c) => (c.global = true));
    },
  },

  nitro: {
    prerender: {
      routes: ['/docs'],
      crawlLinks: true,
    },
  },

  routeRules: {
    '/api/content-search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false },
  },
});
