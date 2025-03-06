<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>