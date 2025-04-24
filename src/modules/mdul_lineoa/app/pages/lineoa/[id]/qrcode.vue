<template>
  <RealmPageEach :pageId>
    <template #default="{ wrapped, entries, resolver }">

      <div class="flex justify-center">
        <div>
          <h1 class="text-center font-bold text-xl">QR Code รับคิว</h1>
          <FieldViewQrCode :modelValue="':' + wrapped.data.memberid"
            style="width: 300px; height: 300px;"></FieldViewQrCode>
        </div>
      </div>
      <li v-for="(msg, i) in messages">{{ msg.data }}</li>
    </template>
  </RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};

const { messageReceived } = useLiveSync("greetings", "verify");
const messages = ref<any[]>([]);

watch(messageReceived, (newMessages) => {
  messages.value.push(newMessages);
  navigateTo({ name: 'lineoa.list.root' });
});
</script>