<template>
  <!-- <RealmPageList :pageId></RealmPageList> -->
  <p class="text-md font-bold mb-4">รายละเอียดสัญญา</p>
  <UCard>
    <p class="space-y-2">
    <p>ประเภทเงินกู้ :<br>
      <strong>สินเชื่อกู้สามัญทั่วไป</strong><br>
    </p>
    <p> เจ้าของสัญญา(ผู้กู้) :<br> <strong>นางสาวกัญยา พุทาสี</strong>
    </p>
    <p>
      เลขที่สัญญา :<br> <strong>00015</strong><br>
    </p>
    <p>
      จำนวนเงินที่กู้: <strong>500,000 บาท</strong>
    </p>
    </p>
  </UCard>
  <div class="flex justify-center gap-4 mt-6">
    <UButton @click="accept">ยินยอม</UButton>
    <UButton
      @click="decline"
      style="background-color: red;"
    >ไม่ยินยอม</UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.generalloan`,
});
const pageId = {
  page: 'generalloan',
};

function accept() {
  alert('คุณได้ยินยอมเป็นผู้ค้ำประกัน');
}

function decline() {
  alert('คุณไม่ได้ยินยอมเป็นผู้ค้ำประกัน');
}
</script>