<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })

const headlinks = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}]

const footers = [{
  label: 'Resources',
  children: [{
    label: 'Help center'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const files = setupAppNavigation(navigation, headlinks, footers);
// useAppExtraRolesAndComponents();
</script>
