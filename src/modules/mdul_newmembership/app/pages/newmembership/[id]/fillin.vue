<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.fillin`,
});
const pageId = {
  page: 'fillin',
};
</script>