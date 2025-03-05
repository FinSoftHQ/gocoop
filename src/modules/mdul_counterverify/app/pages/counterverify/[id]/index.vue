<template>
  <RealmPageEach :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <slot
        :wrapped
        :entries
        :resolver
      ></slot>
    </template>    
  </RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.root`,
});
const pageId = {
  page: 'root',
};
</script>