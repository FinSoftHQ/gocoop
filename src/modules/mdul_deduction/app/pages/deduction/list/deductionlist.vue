<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex justify-end mb-4 gap-4">
        <UButton type="button">
          หักเงินได้แล้ว
        </UButton>
        <UButton
          type="button"
          @click="navigateTo({ name: 'deduction.list.deductioncheck' })"
        >
          แก้ไขการหักเงิน
        </UButton>
      </div>
      <EntityTable
        :data="wrapped.data"
        :columns="columns"
        :entries="entries"
        :resolver="resolver"
        v-model="selected"
      >

        <template #fullname-data="{ row, column }">
          {{ getPrefix(row.prefix) }}{{ row.fname }} {{ row.lname }}
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
  name: `deduction.list.deductionlist`,
});
const pageId = {
  page: 'deductionlist',
};

const pageDef = usePageDefinition(pageId);
const pageFunctions = usePageFunctions(pageDef);
const { formatNumber } = useValueFormatters();

const selected = ref([]);

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
    key: 'jobPosition',
    label: 'ตำแหน่ง',
  }, {
    key: 'department',
    label: 'แผนก',
  }, {
    key: 'alldebts',
    label: 'หนี้สินทั้งหมด',
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
  const selected = ref([]);
  const { loanfast = 0, loangeneral = 0, loanspecial = 0, loanstock = 0, stockValue } = row;
  return loanfast + loangeneral + loanspecial + loanstock + stockValue;
}
</script>