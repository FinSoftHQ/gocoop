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
  label: 'รับเรื่องสมัครสมาชิก',
  to: '/counterregister/list/root'
}, {
  label: 'รับเรื่องยืนยันตัวตน',
  to: '/counterverify/list/root'
}, {
  label: 'รับเรื่องขอกู้ฉุกเฉิน',
  to: '/counterloanfast/list/root'
},
{
  label: 'การเงิน',
  to: '/finance/list/root'
},
{
  label: 'บันชี',
  to: '/accounting/list/root'
}
]

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
