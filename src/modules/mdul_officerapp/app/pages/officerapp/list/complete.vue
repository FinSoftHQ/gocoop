<template>
  <div class="mx-auto max-w-screen-sm text-center">
        <div>
          <h3 class="text-2xl font-bold dark:text-white">
            ยืนยันตัวตนเรียบร้อยแล้ว
          </h3>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4">
            กรุณากดปุ่ม "ยืนยันตัวตนเสร็จสิ้น" เพื่อสิ้นสุดขั้นตอนการยืนยันตัวตน
          </p>
          <div class="flex justify-center mt-6">
            <!-- <FieldViewQrCode modelValue="กรุณาเปิดกล้องโทรศัทพ์ของคุณในการสแกน" class="w-[150px] h-[150px]" ></FieldViewQrCode> -->
            <UIcon name="fluent:person-link-20-filled" size="150"></UIcon>
          </div>
        </div>
        <div>
          <!-- <UButton class="mt-10"
            icon="i-heroicons-arrow-path-solid"
            color="gray"
            variant="outline">Refresh</UButton> -->

          <div class="mt-10 flex justify-center"></div>
          <UButton @click="sendMessage">ยืนยันตัวตนเสร็จสิ้น</UButton>
          <li v-for="(msg, i) in messages">{{ msg }}</li>
        </div>
      </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.list.complete`,
});
const pageId = {
  page: 'complete',
};

const { messageReceived, publish } = useLiveSync("greetings", "verify");
const messages = ref<any[]>([]);
const message = ref<string>("Verify Success");

watch(messageReceived, (newMessages) => {
  messages.value.push(newMessages);
});

function sendMessage() {
  publish(message.value);
  navigateTo({ name: 'officerapp.list.root' }); 
}
</script>