<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.result`,
});
const pageId = {
  page: 'result',
};
</script>