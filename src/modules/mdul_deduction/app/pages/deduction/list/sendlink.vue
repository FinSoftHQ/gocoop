<template>
  <RealmPageList :pageId>
    <template #default="{ wrapped, entries, resolver }">
      <div class="flex justify-end mb-4">
        <UButton
          type="button"
          @click="isModalVisible = true"
        >
          <svg
            class="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"
            />
          </svg>
          แชร์ลิงค์
        </UButton>
      </div>
      <!-- Main modal -->
      <div
        v-if="isModalVisible"
        tabindex="-1"
        aria-hidden="true"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      >
        <div class="relative p-4 w-full max-w-lg max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <!-- Modal header -->
            <div class="flex items-center justify-between">
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                @click="isModalVisible = false"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="px-4 pb-4 md:px-5 md:pb-5">
              <label
                for="course-url"
                class="text-sm font-medium text-gray-900 dark:text-white mb-2 block"
              >แชร์ลิงค์คอร์สด้านล่าง:</label>
              <div class="relative mb-4">
                <input
                  id="course-url"
                  ref="courseUrlInput"
                  type="text"
                  class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :value="currentUrl"
                  disabled
                  readonly
                >
                <button
                  @click="copyToClipboard"
                  class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                >
                  <span id="default-icon-course-url">
                    <svg
                      class="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path
                        d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
                      />
                    </svg>
                  </span>
                  <span
                    id="success-icon-course-url"
                    class="hidden"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id="tooltip-course-url"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                  <span id="default-tooltip-message-course-url">Copy to clipboard</span>
                  <span
                    id="success-tooltip-message-course-url"
                    class="hidden"
                  >Copied!</span>
                  <div
                    class="tooltip-arrow"
                    data-popper-arrow
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        size: 'text-sm'
        },
        td: {
        base: 'whitespace-nowrap text-center rtl:text-center',
        padding: 'p-1',
        color: 'text-gray-500 dark:text-gray-400',
        font: '',
        size: 'text-sm'
        }}"
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
      </EntityTable>
    </template>
  </RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.list.sendlink`,
});
const pageId = {
  page: 'sendlink',
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
    label: 'เงินติ้น',
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
    label: 'ยอมทรัพย์',
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

import { ref, onMounted } from 'vue';
const isModalVisible = ref(false);
const courseUrlInput = ref(null);
const currentUrl = ref('');

onMounted(() => {
  currentUrl.value = window.location.href;
});

function copyToClipboard() {
  const specificUrl = 'http://localhost:3000/deduction/list/deductionlist';
  navigator.clipboard.writeText(specificUrl).then(() => {
    // Optionally, you can show a success message or change the button icon
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function calculateTotalDeduction(row: any): number {
  const { loanfast = 0, loangeneral = 0, loanspecial = 0, loanstock = 0 } = row;
  return loanfast + loangeneral + loanspecial + loanstock;
}
</script>