<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped }">
      <h1 class="text-center font-bold">QR Code โอนเงิน</h1>
      <div class="flex justify-center">
        <NuxtLink to="/finance/list/completed">
          <FieldViewQrCode
            modelValue="link_your_website_here/officerapp/list/complete"
            style="width: 300px; height: 300px;"
          ></FieldViewQrCode>
        </NuxtLink>
      </div>
      <li v-for="(msg, i) in messages">{{ msg.data }}</li>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
const messages = ref<any[]>([]);
</script>