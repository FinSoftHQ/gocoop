<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.create.root`,
});
const pageId = {
  page: 'root',
};
</script>