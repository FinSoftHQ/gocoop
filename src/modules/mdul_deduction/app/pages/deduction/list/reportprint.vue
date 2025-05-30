<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex flex-col items-center space-y-2 mb-4">
        <p class="font-normal text-gray-900 dark:text-white text-right w-full mt-2 px-4">
          หน้าที่ :
        </p>
        <h2 class="text-xl font-bold text-center">สหกรณ์ออมทรัพย์โรงพยาบาลศรีสะเกษ จำกัด</h2>
        <div class="flex justify-between w-full px-4">
          <p class="font-normal text-gray-900 dark:text-white">
            วันที่พิมพ์ :{{ new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
            }}
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            สังกัด สอโรงพยาบาลศรีสะเกษ
          </p>
          <p class="font-normal text-gray-900 dark:text-white">
            เวลาพิมพ์ : {{ new Date().toLocaleTimeString('th-TH') }} น.
          </p>
        </div>
        <div class="flex justify-between w-full px-4">
          <p class="font-normal text-gray-900 dark:text-white">
            ประเภท : หักเงินเดือน
          </p>

          <p class="font-normal text-gray-900 dark:text-white">
            ผู้พิมพ์ :
          </p>
        </div>
      </div>
      <div class="flex mb-4 u gap-4 justify-end px-4">
        <span class=" text-sm font-medium text-gray-700 dark:text-gray-300">
          รายชื่อทั้งหมด: {{ wrapped.data.length }}
        </span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          รวมเงินทั้งหมด: 0
        </span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          หักได้ทั้งหมด: 0
        </span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          เงินที่ขาด: 0
        </span>
      </div>
      <EntityTable
        :data="wrapped.data"
        :columns="columns"
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
            size: 'text-xs'
          },
          td: {
            base: 'whitespace-nowrap text-center rtl:text-center',
            padding: 'p-1',
            color: 'text-gray-500 dark:text-gray-400',
            font: '',
            size: 'text-xs'
          }
        }"
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
        <template #alldebts-data="{ row, column }">
          {{ formatNumber(calculateTotalDeduction(row)) }}
        </template>
        <template #deducted-data="{ row, column }">
          {{ formatNumber(row.deducted) }}
        </template>
      </EntityTable>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.list.reportprint`,
});
const pageId = {
  page: 'reportprint',
};
const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);
const { formatNumber } = useValueFormatters();

const columns = [
  // {
  //   key: 'no',
  //   label: 'ลำดับ',
  // },
  {
    key: 'idmember',
    label: 'เลขสมาชิก',
  },
  {
    key: 'fullname',
    label: 'ชื่อ-สกุล',
  },
  {
    key: 'businessfees',
    label: 'ค่าทำเนียม',
  },
  {
    key: 'periodNO',
    label: 'หุ้นงวดที่',
  },
  {
    key: 'stock',
    label: 'จำนวนเงิน',
  },
  {
    key: 'periodFast',
    label: 'งวดที่',
  },
  {
    key: 'loanFast',
    label: 'เงินต้น',
  },
  {
    key: 'emergencyFast',
    label: 'ดอกเบี้ย',
  },
  {
    key: 'periodNOFast',
    label: 'สามัญงวดที่',
  },
  {
    key: 'ordinaryPrincipal',
    label: 'เงินต้น',
  },
  {
    key: 'ordinaryInterest',
    label: 'ดอกเบี้ย',
  },
  {
    key: 'loan',
    label: 'เงินกู้',
  },
  {
    key: 'surrenderWealth',
    label: 'ออมทรัพย์',
  },
  {
    key: 'other',
    label: 'อื่นๆ',
  },
  {
    key: 'accumulatedMoney',
    label: 'เงินสะสม',
  },
  {
    key: 'salary',
    label: 'เงินเดือน',
  },
  {
    key: 'totalCreditors',
    label: 'รวมเงินชำระ',
  },
  {
    key: 'receiptNumber',
    label: 'เลขที่ใบเสร็จ',
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
  navigateTo({ name: pageFunctions.relativeName({ module: 'deduction', realm: 'each', page: 'root' }), params: { id: item.id } });
}

function calculateTotalDeduction(row: any): number {
  const { loanfast = 0, loangeneral = 0, loanspecial = 0, loanstock = 0 } = row;
  return loanfast + loangeneral + loanspecial + loanstock;
}
</script>