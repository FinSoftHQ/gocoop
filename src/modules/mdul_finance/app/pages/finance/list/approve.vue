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
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
      >
        <template #fullname-data="{ row, column }">
          <div class="text-left">
            {{ getPrefix(row.prefix) }}{{ row.fname }} {{ row.lname }}
          </div>
        </template>
        <template #amount-data="{ row, column }">
          <div class="text-right">
            {{ row.amount }}
          </div>
        </template>
        <template #stockValue-data="{ row, column }">
          <div class="text-right">
            {{ row.stockValue }}
          </div>
        </template>
        <template #period-data="{ row, column }">
          <div class="text-center">
            {{ row.period }}
          </div>
        </template>
        <template #debt-data="{ row, column }">
          <div class="text-right">
            {{ row.debt }}
          </div>
        </template>
        <template #interest-data="{ row, column }">
          <div class="text-right">
            {{ row.interest }}
          </div>
        </template>
        <template #balance-data="{ row, column }">
          <div class="text-right">
            {{ row.balance }}
          </div>
        </template>
        <template #bankAccount-data="{ row, column }">
          <div class="text-center">
            {{ row.bankAccount }}
          </div>
        </template>
       
      </EntityTable>
      <div class="flex justify-between w-full px-4">
        <p class="font-normal text-gray-900 dark:text-white">
          รวมหน่วย :  
        </p>
        <p class="font-normal text-gray-900 dark:text-white">
        </p>
      </div>
      <div class="flex justify-between w-full px-4">
        <p class="font-normal text-gray-900 dark:text-white">
          ยอดรวมทั้งสิ้น : {{ data }}
        </p>
        <p class="font-normal text-gray-900 dark:text-white">
        </p>
      </div>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.approve`,
});
const pageId = {
  page: 'approve',
};

const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);

const columns = [
  {
    key: 'no',
    label: 'ที่',
  },
  {
    key: 'idmember',
    label: 'เลขสมาชิก',
  },
  {
    key: 'fullname',
    label: 'ชื่อ-สกุล',
  }, {
    key: 'amount',
    label: 'วงเงินกู้',
  }, {
    key: 'stockValue',
    label: 'หักซื้อหุ้น',
  }, {
    key: 'installments',
    label: 'สินเชื่อ',
  }, {
    key: 'period ',
    label: 'งวดที่',
  }, {
    key: 'debt',
    label: 'หนี้คงเหลือ',
  },
  {
    key: 'interest',
    label: 'ดอกเบี้ย',
  },
  {
    key: 'balance',
    label: 'คงเหลือรับ',
  },
  {
    key: 'bankAccount',
    label: 'เลขบัญชี',
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

</script>