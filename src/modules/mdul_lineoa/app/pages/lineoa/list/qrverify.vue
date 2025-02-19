<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.qrverify`,
});
const pageId = {
  page: 'qrverify',
};
</script>