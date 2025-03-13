<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex flex-col items-center space-y-2 mb-4">
        <h2 class="text-xl font-bold text-center py-2">สหกรณ์ออมทรัพย์โรงพยาบาลศรีเกษ จำกัด</h2>
        <div class="flex justify-between w-full px-4">
          <p class="font-normal text-gray-900 dark:text-white">
            วันที่พิมพ์ :{{ new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            รายงานการจ่ายเงินกู้
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            เวลาพิมพ์ : {{ new Date().toLocaleTimeString('th-TH') }} น.
          </p>
        </div>
        <div class="flex justify-between w-full px-4">
          <p class="font-normal text-gray-900 dark:text-white">
            ประเภท : เงินกู้ฉุกเฉิน
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            รายงานการจ่ายเงินกู้ฉุกเฉินวันที่ {{ new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            ผู้พิมพ์ :
          </p>
        </div>
      </div>
      <EntityTable
        :data="wrapped.data"
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
        :ui="{
          tr: {
            base: '',
            selected: 'bg-gray-50 dark:bg-gray-800/50',
            expanded: 'bg-gray-50 dark:bg-gray-800/50',
            active: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'
          },
          th: {
            base: 'whitespace-nowrap text-center rtl:text-center',
            padding: 'p-1',
            color: 'text-gray-900 dark:text-white',
            font: 'font-semibold',
            size: 'text-sm'
          },
          td: {
            base: 'whitespace-nowrap text-center rtl:text-center',
            padding: 'p-1',
            color: 'text-gray-500 dark:text-gray-400',
            font: '',
            size: 'text-sm'
          },
        }"
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
  name: `finance.list.report`,
});
const pageId = {
  page: 'report',
};


const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);

const columns = [
  // {
  //   key: 'no',
  //   label: 'ลำดับ',
  // },  
  // {
  //   key: 'idmember',
  //   label: 'รหัสสมาชิก',
  //   sortable: true
  // },
  {
    key: 'fullname',
    label: 'ชื่อ-สกุล',
  }, {
    key: 'position',
    label: 'ตำแหน่ง',
  },{
    key: 'bureau',
    label: 'หน่วยงาน',
  }, {
    key: 'installments',
    label: 'จำนวนงวด',
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