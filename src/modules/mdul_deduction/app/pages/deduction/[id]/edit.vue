<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>