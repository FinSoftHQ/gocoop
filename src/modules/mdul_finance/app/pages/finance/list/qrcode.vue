<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped }">
      <h3 class="text-center text-2xl font-bold dark:text-white mb-10">
              กรุณาเตรียมโทรศัพท์มือถือ และ สแกน QR Code เพื่อโอนเงิน
            </h3>
      <div class="flex justify-center">
        <NuxtLink to="/finance/list/completed">
          <UCard>
            <p class="text-center font-bold">QR Code สำหรับโอนเงิน</p>
            <FieldViewQrCode
              modelValue="link_your_website_here/officerapp/list/complete"
              style="width: 300px; height: 300px;"
            ></FieldViewQrCode>
            <div class="flex justify-center">
              <UButton to="/finance/list/transfermoney" class="bg-red-500 text-white">ยกเลิกการโอนเงิน</UButton>
            </div>
          </UCard>
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