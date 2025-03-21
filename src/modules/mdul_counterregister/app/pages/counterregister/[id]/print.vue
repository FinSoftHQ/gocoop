<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.print`,
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
const prefixStates: Record<string, string> = {
  option1: 'นาย',
  option2: 'นาง',
  option3: 'นางสาว',
  option4: 'เด็กชาย',
  option5: 'เด็กหญิง',
  option6: 'ดอกเตอร์',
  option7: 'แพทย์ชาย',
  option8: 'แพทย์หญิง',
};

const { formatNumber, numberToThaiText, currencyToThaiText, formatDate, } = useValueFormatters();
useAppExtraRolesAndComponents();
usePdfPrint({
  templatePath: '/Rcut.json',
  basePdfPath: '/register4.pdf',
  // blankBasePdf: false,
  dataTransformer: (data) => {

    const beneficiaryInfo = computed(() => {
      const label = data.beneficiary[0].label;
      const regex = /^(.*?)\s+(.*?)\s+(.*?)\s+(\d+)$/;
      const match = label.match(regex);
      if (match) {
      return {
        beneficiaryname: match[1] + ' ' + match[2],
        relationship: match[3],
        beneficiaryphone: match[4],
      };
      }
      return {
      beneficiaryname: '',
      relationship: '',
      beneficiaryphone: '',
      };
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

    const birthDate = new Date(
      parseInt(data.birthDate.substring(0, 4), 10),
      parseInt(data.birthDate.substring(4, 6), 10) - 1,
      parseInt(data.birthDate.substring(6, 8), 10)
    );

    const birthDateDay = birthDate.getDate();
    const birthDateMonth = monthNames[birthDate.getMonth()];
    const birthDateYear = (birthDate.getFullYear() + 543).toString();
    return {
      ...data,
      // month5: data.Idmember,
      text: '123456',
      salary: formatNumber(data.salary),
      salarytext1: numberToThaiText(data.salary) + 'บาท',
      stockValue: formatNumber(data.stockValue),
      jobPosition: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition2: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition3: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition4: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition5: positionMapping[data.jobPosition] || data.jobPosition,
      datetimeDay: createdAtDay.toString(),
      datetimeMonth: createdAtMonth,
      datetimeYear: createdAtYear,
      datetimeDay2: createdAtDay.toString(),
      datetimeMonth2: createdAtMonth,
      datetimeYear2: createdAtYear,
      datetimeDay3: createdAtDay.toString(),
      datetimeMonth3: createdAtMonth,
      datetimeYear3: createdAtYear,
      datetimeDay4: createdAtDay.toString(),
      datetimeMonth4: createdAtMonth,
      datetimeYear4: createdAtYear,
      datetimeDay5: createdAtDay.toString(),
      datetimeMonth5: createdAtMonth,
      datetimeYear5: createdAtYear,
      name: prefixStates[data.prefix] +  data.fname + '   ' + data.lname,
      nameSing1: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name2: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name4: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name5: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name6: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name7: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name8: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name9: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      name10: prefixStates[data.prefix] + data.fname + '   ' + data.lname,
      birthDateDay: birthDateDay.toString(),
      birthDateMonth: birthDateMonth,
      birthDateYear: birthDateYear,
      age1: formatAge(data.birthDate),
      age2: formatAge(data.birthDate),
      age3: formatAge(data.birthDate),
      age4: formatAge(data.birthDate),
      homeNumber2: data.homeNumber,
      homeNumber3: data.homeNumber,
      homeNumber4: data.homeNumber,
      village2: data.village,
      village3: data.village,
      village4: data.village,
      alley2: data.alley,
      alley3: data.alley,
      road2: data.road,
      road3: data.road,
      road4: data.road,
      parish2: data.parish,
      parish3: data.parish,
      parish4: data.parish,
      district2: data.district,
      district3: data.district,
      district4: data.district,
      province2: data.province,
      province3: data.province,
      province4: data.province,
      phoneNumber2: data.phoneNumber,
      phoneNumber3: data.phoneNumber,
      phoneNumber4: data.phoneNumber,
      beneficiaries: beneficiaryInfo.value.beneficiaryname,
      relationship:  beneficiaryInfo.value.relationship,
      beneficiariesphone:  beneficiaryInfo.value.beneficiaryphone,
    };
  },
});
const { formatDisplay: formatAge } = useDisplayField({
  dateFormat: 'age',
});

</script>