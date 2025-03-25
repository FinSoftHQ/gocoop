<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex justify-end mb-4">
        <UButton type="button">
          บันทึกและส่งเรื่องให้ สหกรณ์
        </UButton>
      </div>
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
        <template #age-data="{ row, column }">
          {{ formatAge(row.birthDate) }}
        </template>
      </EntityTable>
    </template>
  </RealmPageList>
</template>


<script setup lang="ts">
definePageMeta({
  name: `salarycheck.list.confirmcheck`,
});
const pageId = {
  page: 'confirmcheck',
};


const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);

const columns = [
  {
    key: 'no',
    label: 'ลำดับ',
  },
  // {
  //   key: 'idmember',
  //   label: 'รหัสสมาชิก',
  //   sortable: true
  // },
  {
    key: 'fullname',
    label: 'ชื่อ-สกุล',
  }, {
    key: 'age',
    label: 'อายุ',
    sortable: true
  }, {
    key: 'jobPosition',
    label: 'ตำแหน่ง',
  }, {
    key: 'department',
    label: 'แผนก',
  }
]

const { formatDisplay: formatAge } = useDisplayField({
  dateFormat: 'age',
});

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
  navigateTo({ name: pageFunctions.relativeName({ module: 'salarycheck', realm: 'each', page: 'root' }), params: { id: item.id } });
}
</script>