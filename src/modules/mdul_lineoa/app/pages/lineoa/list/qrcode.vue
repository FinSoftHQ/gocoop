<template>
  <NuxtLink to="/lineoa/list/closed">
    <div class="flex flex-col justify-center ">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
        alt="Description of image"
      >
    </div>
  </NuxtLink>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>