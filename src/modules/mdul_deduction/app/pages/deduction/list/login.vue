<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.list.login`,
});
const pageId = {
  page: 'login',
};
</script>