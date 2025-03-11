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
  option1: 'ข้าราชการและลูกจ้างประจำ',
  option2: 'ลูกจ้าง เงินบำรุง และพนักงานกระทรวงสาธารณสุข',
  option3: 'พนักงานราชการ ลูกจ้างเงินบำรุง (ตามวุฒิ) และพนักงานกระทรวงสาธารณสุข (ตามวุฒิ)',
  option4: 'เจ้าหน้าที่และลูกจ้างสหกรณ์',
};

const departmentMapping: Record<string, string> = {
  option1: 'เพื่อการอันจำเป็น',
  option2: 'จัดหาสิ่งจำเป็นสำหรับครอบครัว',
  option3: 'อุปการะเลี้ยงดูบุคคลในครอบครัว',
  option4: 'ปลดเปลื้องหนี้สิ้นของครัวเรือน',
  option5: 'รักษาพยาบาลบุคคลในครอบครัว',
};

const prefixMapping: Record<string, string> = {
  option1: 'นาย',
  option2: 'นาง',
  option3: 'นางสาว',
  option4: 'เด็กชาย',
  option5: 'เด็กหญิง',
  option6: 'ดอกเตอร์',
  option7: 'แพทย์ชาย',
  option8: 'แพทย์หญิง',
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

    const monthNames = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const createdAtDate = new Date(
      parseInt(data.createdAt.substring(0, 4), 10),
      parseInt(data.createdAt.substring(4, 6), 10) - 1,
      parseInt(data.createdAt.substring(6, 8), 10)
    );

    const createdAtDay = createdAtDate.getDate();
    const createdAtMonth = monthNames[createdAtDate.getMonth()];
    const createdAtYear = (createdAtDate.getFullYear() + 543).toString();

    const months = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (createdAtDate.getMonth() + i + 1) % 12 ;
      return monthNames[monthIndex];
    });

    const years = Array.from({ length: 12 }, (_, i) => {
      const year = createdAtDate.getFullYear() + Math.floor((createdAtDate.getMonth() + i + 1) / 12);
      return (year + 543).toString(); 
    });

    console.log(createdAtDay, createdAtMonth, createdAtYear);
    return {
      ...data,
      writeat: 'สหกรณ์โรงพยาบาลศรีสะเกษ',
      createday: createdAtDay.toString(),
      createday2: createdAtDay.toString(),
      createmounth: createdAtMonth,
      createmounth2: createdAtMonth,
      createyear: createdAtYear,
      createyear2: createdAtYear,
      idmember: '',
      fullname: prefixMapping[data.prefix]  + data.fname + ' ' + data.lname,
      fullname2: prefixMapping[data.prefix]  + data.fname + ' ' + data.lname,
      fullname5: prefixMapping[data.prefix]  + data.fname + ' ' + data.lname,
      position: positionMapping[data.position] || data.position,
      department:  data.department,
      purpose: departmentMapping[data.purpose] || data.purpose,
      month1: months[0],
      month2: months[1],
      month3: months[2],
      month4: months[3],
      month5: months[4],
      month6: months[5],
      month7: months[6],
      month8: months[7],
      month9: months[8],
      month10: months[9],
      month11: months[10],
      month12: months[11],

      year1: years[0],
      year2: years[1],
      year3: years[2],
      year4: years[3],
      year5: years[4],
      year6: years[5],
      year7: years[6],
      year8: years[7],
      year9: years[8],
      year10: years[9],
      year11: years[10],
      year12: years[11],


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
      amounttext1: numberToThaiText(data.amount) + 'บาท',
      amounttext2: numberToThaiText(data.amount) + 'บาท',
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