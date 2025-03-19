<template>
  <table class="border-collapse border w-full mt-4">
    <thead>
      <tr>
        <th class="border p-2">เดือน</th>
        <th class="border p-2">จำนวนที่ต้องจ่ายทั้งหมด</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="detail in paymentDetails"
        :key="detail.month">
        <td class="border p-2">{{ detail.month }}</td>
        <td class="border p-2">{{ detail.totalPayment.toFixed(2) }} บาท</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{
  loanAmount: number;
  interestRate: number;
  months: number;
}>();

// const totalPayments = computed(() => {
//   const monthlyInterest = (props.loanAmount * props.interestRate / 100) / props.months;
//   const lastMonthInterest = monthlyInterest;
//   const adjustedMonthlyInterest = (props.loanAmount * props.interestRate / 100 - lastMonthInterest) / (props.months - 1);

//   const interestPayments = Array(props.months - 1).fill(adjustedMonthlyInterest);
//   if (interestPayments[0] !== undefined) {
//     interestPayments[0] += lastMonthInterest; // Combine the interest of the 12th month with the 1st month
//   }
//   interestPayments.push(0); // Add a zero for the 12th month interest

//   return interestPayments.map((interest, index) => interest + props.loanAmount / props.months);
// });
const totalPayments = computed(() => {
  const monthlyInterest = (props.loanAmount * props.interestRate / 100) / props.months; // ดอกเบี้ยเฉลี่ยต่อเดือน
  const monthlyPrincipal = props.loanAmount / props.months; // เงินต้นเฉลี่ยต่อเดือน

  // สร้างอาร์เรย์สำหรับการชำระเงินรายเดือน
  const payments = Array(props.months).fill(monthlyPrincipal + monthlyInterest);

  // ย้ายดอกเบี้ยเดือนสุดท้ายไปบวกกับเดือนแรก
  payments[0] += monthlyInterest; // เพิ่มดอกเบี้ยของเดือนสุดท้ายไปยังเดือนแรก
  payments[payments.length - 1] -= monthlyInterest; // ลบดอกเบี้ยของเดือนสุดท้ายออก

  return payments;
});
const paymentDetails = computed(() => {
  return totalPayments.value.map((totalPayment, index) => ({
    month: index + 1,
    // totalPayment
    totalPayment: Math.round(totalPayment / 100) * 100 
  }));
});
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 8px;
  text-align: center;
}
</style>
