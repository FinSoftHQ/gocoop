<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>