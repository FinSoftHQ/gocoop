<template>
  <!-- <RealmPageList :pageId></RealmPageList> -->
  <UCard>
    <div class="flex flex-col items-center justify-center text-center w-full">
      <UIcon
        class="w-16 h-16 mb-4 text-green-500"
        :name="icon"
      />
      <h1 class="text-xl font-bold mb-2">คุณได้ค้ำประกันให้</h1>
      <p class="text-md mb-2">นางสาวกัญยา พุทาสี</p>
      <p class="text-md font-bold mb-2">เรียบร้อยแล้ว</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">

definePageMeta({
  name: `lineoa.list.success`,
});

const pageId = {
  page: 'success',
};
const icon = 'i-line-md-confirm-circle'; // Ensure this matches the imported icon library
</script>