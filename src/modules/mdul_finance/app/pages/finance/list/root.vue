<template>
   <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.root`,
});
const pageId = {
  page: 'root',
};

</script>