<template>
  <RealmPageCreate :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <EntitySection v-model="wrapped.data"
        :entries
        :resolver></EntitySection>
      <p class="mt-4 text-xl font-bold">ตารางส่งเงินคืน 12 งวด</p>
      <FLoanTable :months="12"
        :interest-rate="5.59"
        :loan-amount="wrapped.data.amount" />
    </template>
  </RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>