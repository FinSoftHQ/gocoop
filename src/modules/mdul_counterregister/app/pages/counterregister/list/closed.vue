<template>
   <RealmPageList :pageId="pageId">
    <template #default="{ wrapped, entries, resolver }">
      <EntityTable :data="wrapped.data"
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
        @select="select"></EntityTable>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.list.closed`,
});
const pageId = {
  page: 'closed',
};

const columns = [{
  key: 'name',
  label: 'ชื่อ-สกุล',
  sortable: false
}, 
{
  key: 'age',
  label: 'อายุ',
  sortable: false
}, 
{
  key: 'jobPosition',
  label: 'ตําแหน่งงาน',
  sortable: false
}, 
{
  key: 'department',
  label: 'แผนก',
  sortable: false
}, 
{
  key: 'phoneNumber',
  label: 'เบอร์โทร',
  sortable: false,
}, 
]
</script>