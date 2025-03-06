<template>
  <RealmPageList :pageId="pageId">
    <template #default="{ wrapped, entries, resolver }">
      <EntityTable :data="wrapped.data"
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
        @selectionChanged="select"
       ></EntityTable>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.list.root`,
});
const pageId = {
  page: 'root',
};
const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);

const columns = [{
  key: 'id',
  label: 'ID',
  sortable: true
}, {
  key: 'name',
  label: 'ชื่อ-สกุล',
  sortable: true
}, {
  key: 'lname',
  label: 'ชื่อ-สกุล',
  sortable: true
}, {
  key: 'birthDate',
  label: 'วันเกิด',
  sortable: true
}, {
  key: 'age',
  label: 'อายุ',
  sortable: true
}, {
  key: 'stockValue',
  label: 'ส่งเงินค่าหุ้นรายเดือนละ',
  sortable: true
},
]

function select(item: any) {
  navigateTo({ name: pageFunctions.relativeName({ module: 'counterregister', realm: 'each', page: 'root' }), params: { id: item.id } });
}
</script>