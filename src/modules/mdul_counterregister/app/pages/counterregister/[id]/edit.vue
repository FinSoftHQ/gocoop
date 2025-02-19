<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>