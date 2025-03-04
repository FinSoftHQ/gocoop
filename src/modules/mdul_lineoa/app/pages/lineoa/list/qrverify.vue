<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped }">
      <h1 class="text-center font-bold">QR ยืนยันตัวตน</h1>
      <div class="flex justify-center">
        <FieldViewQrCode
          modelValue="link_your_website_here/officerapp/list/complete"
          style="width: 300px; height: 300px;"
        ></FieldViewQrCode>
      </div>
      <li v-for="(msg, i) in messages">{{ msg.data }}</li>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.qrverify`,
});
const pageId = {
  page: 'qrverify',
};
const { messageReceived } = useLiveSync("greetings", "verify");
const messages = ref<any[]>([]);

watch(messageReceived, (newMessages) => {
  messages.value.push(newMessages);
  navigateTo({ name: 'lineoa.list.root' }); 
});
</script>