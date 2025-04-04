<template>
    <div class="flex mb-4 u gap-4 justify-end">
        <UButton @click="exportToExcel">Export as XLSX</UButton>
     </div>
</template>
<script setup lang="ts">
import * as XLSX from 'xlsx';

const props = defineProps<{
  tableId: string; // Add tableId prop
}>();

const exportToExcel = () => {
  const table = document.getElementById(props.tableId) as HTMLTableElement; // Use tableId dynamically
  if (table) {
    const wb = XLSX.utils.table_to_book(table); // Create workbook from table
    XLSX.writeFile(wb, 'SheetJSTable.xlsx'); // Export to file
  }
};

</script>