<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>