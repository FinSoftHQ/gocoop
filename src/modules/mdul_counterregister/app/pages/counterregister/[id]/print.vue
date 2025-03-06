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
  templatePath: '/register.json',
  basePdfPath: '/register2.pdf',
  // blankBasePdfPath: false,
  dataTransformer: (data) => {

    const beneficiaryInfo = computed(() => {
      const label = data.beneficiary[0].label;
      const regex = /^(.*?)\s+(.*?)\s+(\d+)$/;
      const match = label.match(regex);
      if (match) {
        return {
          beneficiaryname: match[1],
          relationship: match[2],
          beneficiaryphone: match[3],
        };
      }
      return {
        beneficiaryname: '',
        relationship: '',
        beneficiaryphone: '',
      };
    });
    return {
      ...data,
      // month5: data.Idmember,
      text: '123456',
      salary: formatNumber(data.salary),
      salarytext1: numberToThaiText(data.salary),
      stockValue: formatNumber(data.stockValue),
      jobPosition: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition2: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition3: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition4: positionMapping[data.jobPosition] || data.jobPosition,
      jobPosition5: positionMapping[data.jobPosition] || data.jobPosition,
      datetimeDay: data.datetime,
      datetimeMonth: data.datetime,
      datetimeYear: data.datetime,
      datetimeDay2: data.datetime,
      datetimeMonth2: data.datetime,
      datetimeYear2: data.datetime,
      datetimeDay3: data.datetime,
      datetimeMonth3: data.datetime,
      datetimeYear3: data.datetime,
      datetimeDay4: data.datetime,
      datetimeMonth4: data.datetime,
      datetimeYear4: data.datetime,
      datetimeDay5: data.datetime,
      datetimeMonth5: data.datetime,
      datetimeYear5: data.datetime,
      name: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      nameSing1: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name2: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name4: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name5: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name6: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name7: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name8: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name9: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      name10: prefixStates[data.prefix] + data.name + '   ' + data.lname,
      birthDateDay: formatDate(data.birthDate),
      birthDateMonth: formatDate(data.birthDate),
      birthDateYear: formatDate(data.birthDate),
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