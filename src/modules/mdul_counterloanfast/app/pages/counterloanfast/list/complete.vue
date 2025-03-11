<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <EntityTable
        :data="wrapped.data"
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
        @selectionChanged="select"
      >
        <template #fullname-data="{ row, column }">
          {{ getPrefix(row.prefix) }}{{ row.fname }} {{ row.lname }}
        </template>
      </EntityTable>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.list.complete`,
});
const pageId = {
  page: 'complete',
};

const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);

const columns = [
  // {
  //   key: 'no',
  //   label: 'ลำดับ',
  // },
  // {
  //   model: 'idmember',
  //   label: 'รหัสสมาชิก',
  //   spec: {},
  //   component: 'text',
  // },
  {
    key: 'fullname',
    label: 'ชื่อ-สกุล',
  }, {
    key: 'position',
    label: 'ตำแหน่ง',
  }, {
    key: 'department',
    label: 'สังกัด',
  }, {
    key: 'bureau',
    label: 'หน่วยงาน',
  }, {
    key: 'amount',
    label: 'ยอดที่ต้องการกู้ (บาท)',
    sortable: true
  },
]

const prefix: { [key: string]: string } = {
  option1: 'นาย',
  option2: 'นาง',
  option3: 'นางสาว',
  option4: 'เด็กชาย',
  option5: 'เด็กหญิง',
  option6: 'ดอกเตอร์',
  option7: 'แพทย์ชาย',
  option8: 'แพทย์หญิง',
};

function getPrefix(key: string): string {
  return prefix[key] || '';
}

function select(item: any) {
  navigateTo({ name: pageFunctions.relativeName({ module: 'counterloanfast', realm: 'each', page: 'root' }), params: { id: item.id } });
}
</script>