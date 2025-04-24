<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.each.result`,
});
const pageId = {
  page: 'result',
};
</script>