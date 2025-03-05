<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.each.print`,
});
const pageId = {
  page: 'print',
};

const positionMapping: Record<string, string> = {
  governmentOfficer: 'ข้าราชการและลูกจ้างประจำ',
  temporaryEmployee: 'ลูกจ้างชั่วคราว',
  healthMinistryEmployee: 'พนักงานกระทรวงสาธารณสุข',
  cooperativeStaff: 'เจ้าหน้าที่และลูกจ้างสหกรณ์',
  permanentEmployee: 'ลูกจ้างประจำ',
  temporaryEmployeeDuration: 'ลูกจ้างชั่วคราว (ตามระยะเวลา)',
};

const departmentMapping: Record<string, string> = {
  option1: 'เพื่อการอันจำเป็น',
  option2: 'จัดหาสิ่งจำเป็นสำหรับครอบครัว',
  option3: 'อุปการะเลี้ยงดูบุคคลในครอบครัว',
  option4: 'ปลดเปลื้องหนี้สิ้นของครัวเรือน',
  option5: 'รักษาพยาบาลบุคคลในครอบครัว',
};

const { formatNumber, numberToThaiText, currencyToThaiText, } = useValueFormatters();
useAppExtraRolesAndComponents();
usePdfPrint({
  templatePath: '/loanfast.json',
  basePdfPath: '/loanfast.pdf',
  // blankBasePdfPath: false,
  dataTransformer: (data) => {
    const totalPayments = computed(() => {
      const monthlyInterest = (data.amount * 5.59 / 100) / 12;
      const lastMonthInterest = monthlyInterest;
      const adjustedMonthlyInterest = (data.amount * 5.59 / 100 - lastMonthInterest) / (12 - 1);

      const interestPayments = Array(12 - 1).fill(adjustedMonthlyInterest);
      if (interestPayments[0] !== undefined) {
        interestPayments[0] += lastMonthInterest; // Combine the interest of the 12th month with the 1st month
      }
      interestPayments.push(0); // Add a zero for the 12th month interest

      return interestPayments.map((interest, index) => interest + data.amount / 12);
    });

    const paymentDetails = computed(() => {
      return totalPayments.value.map((totalPayment, index) => ({
        month: index + 1,
        totalPayment
      }));
    });
    return {
      ...data,
      writeat: 'สหกรณ์โรงพยาบาลศรีสะเกษ',
      idmember: data.idmember,
      fullname: data.fname + '   ' + data.lname,
      fullname2: data.fname + '   ' + data.lname,
      // fullname3: data.fname + '   ' + data.lname,
      // fullname4: data.fname + '   ' + data.lname,
      fullname5: data.fname + '   ' + data.lname,
      // position: data.position ,
      position: positionMapping[data.position] || data.position,
      department: data.department,
      purpose: departmentMapping[data.purpose] || data.purpose,
      month1: 'มกราคม',
      month2: 'กุมภาพันธ์',
      month3: 'มีนาคม',
      month4: 'เมษายน',
      month5: 'พฤษภาคม',
      month6: 'มิถุนายน',
      month7: 'กรกฎาคม',
      month8: 'สิงหาคม',
      month9: 'กันยายน',
      month10: 'ตุลาคม',
      month11: 'พฤศจิกายน',
      month12: 'ธันวาคม',

      year1: '2568',
      year2: '2568',
      year3: '2568',
      year4: '2568',
      year5: '2568',
      year6: '2568',
      year7: '2568',
      year8: '2568',
      year9: '2568',
      year10: '2568',
      year11: '2568',
      year12: '2568',


      instalment1: formatNumber(totalPayments.value[0]),  
      instalment2: formatNumber(totalPayments.value[1]),
      instalment3: formatNumber(totalPayments.value[2]),  
      instalment4: formatNumber(totalPayments.value[3]),
      instalment5: formatNumber(totalPayments.value[4]),
      instalment6: formatNumber(totalPayments.value[5]),
      instalment7: formatNumber(totalPayments.value[6]),
      instalment8: formatNumber(totalPayments.value[7]),
      instalment9: formatNumber(totalPayments.value[8]),
      instalment10: formatNumber(totalPayments.value[9]),
      instalment11: formatNumber(totalPayments.value[10]),
      instalment12: formatNumber(totalPayments.value[11]),


      amount1: formatNumber(data.amount),
      amount2: formatNumber(data.amount),
      amount3: formatNumber(data.amount),
      amounttext1: numberToThaiText(data.amount),
      amounttext2: numberToThaiText(data.amount),
      salary: formatNumber(data.salary),
      // monthlyIncome: 'รายได้รายเดือน',
      // principalLoan:  'ต้นเงินกู้สามัญ',
      // emergencyLoan:  'ต้นเงินกู้เพื่อเหตุฉุกเฉิน',
      // creditLimit:  'จำกัดวงเงินกู',
      // remainingCredit:  'จำกัดวงเงินกู้',
    };
  },
});
</script>