<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.each.editdue`,
});
const pageId = {
  page: 'editdue',
};
</script>