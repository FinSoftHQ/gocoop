<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex mb-4 u gap-4 justify-end">
        <UButton id="sheetjsexport" class="btn-primary"><b>Export as XLSX</b></UButton>
      </div>
      <table id="TableToExport" class="table-auto border-collapse border border-gray-300 w-full text-sm text-center">
        <thead>
          <tr>
            <th colspan="4" class="border border-gray-300 p-2 bg-gray-100 text-left">
              รายงานสรุป
            </th>
          </tr>
          <tr>
            <th class="border border-gray-300 p-2 bg-gray-100">รายชื่อทั้งหมด</th>
            <th class="border border-gray-300 p-2 bg-gray-100">รวมเงินทั้งหมด</th>
            <th class="border border-gray-300 p-2 bg-gray-100">หักได้ทั้งหมด</th>
            <th class="border border-gray-300 p-2 bg-gray-100">เงินที่ขาด</th>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">{{ wrapped.data.length }}</td>
            <td class="border border-gray-300 p-2">
              {{ formatNumber(wrapped.data.reduce((sum :any , item:any ) => sum + (item.totalCreditors || 0), 0)) }}
            </td>
            <td class="border border-gray-300 p-2">
              {{ formatNumber(wrapped.data.reduce((sum :any , item:any ) => sum + (item.deductible || 0), 0)) }}
            </td>
            <td class="border border-gray-300 p-2">
              {{ formatNumber(wrapped.data.reduce((sum :any , item:any ) => sum + (item.totalCreditors || 0) - (item.deductible || 0), 0)) }}
            </td>
          </tr>
          <tr>
            <th v-for="column in columns" :key="column.key" class="border border-gray-300 p-2 bg-gray-100">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in wrapped.data" :key="row.id" @click="select(row)" class="hover:bg-gray-50 cursor-pointer">
            <td v-for="column in columns" :key="column.key" class="border border-gray-300 p-2">
              <template v-if="column.key === 'fullname'">
                {{ getPrefix(row.prefix) }}{{ row.fname }} {{ row.lname }}
              </template>
              <template v-else-if="column.key === 'age'">
                {{ formatAge(row.birthDate) }}
              </template>
              <template v-else-if="column.key === 'alldebts'">
                {{ formatNumber(calculateTotalDeduction(row)) }}
              </template>
              <template v-else-if="column.key === 'deducted'">
                {{ formatNumber(row.deducted) }}
              </template>
              <template v-else>
                {{ row[column.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as XLSX from 'xlsx'; // Import the SheetJS library

definePageMeta({
  name: `deduction.list.closed`,
});
const pageId = {
  page: 'closed',
};

const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);
const { formatNumber } = useValueFormatters();

const columns = [
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

onMounted(() => {
  const exportButton = document.getElementById('sheetjsexport');
  const table = document.getElementById('TableToExport') as HTMLTableElement;

  exportButton?.addEventListener('click', () => {
    if (table) {
      const wb = XLSX.utils.table_to_book(table); // Create workbook from table
      XLSX.writeFile(wb, 'SheetJSTable.xlsx'); // Export to file
    }
  });
});
</script>