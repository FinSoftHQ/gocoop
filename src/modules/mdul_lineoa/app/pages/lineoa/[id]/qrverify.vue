<template>
  <RealmPageEach :pageId>
    <template #default="{ wrapped }">
      <div class="flex justify-center">
        <div>
          <h1 class="text-center font-bold text-xl">QR Code ยืนยันตัวตน</h1>
          <FieldViewQrCode
            modelValue="link_your_website_here/officerapp/list/complete"
            style="width: 300px; height: 300px;"
          ></FieldViewQrCode>
        </div>
      </div>
      <li v-for="(msg, i) in messages">{{ msg.data }}</li>
    </template>
  </RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.qrverify`,
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