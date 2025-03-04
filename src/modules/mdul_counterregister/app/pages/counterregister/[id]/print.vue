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

const { formatNumber, numberToThaiText,currencyToThaiText, } = useValueFormatters();
useAppExtraRolesAndComponents();
usePdfPrint({
  templatePath: '/register.json',
  basePdfPath: '/register.pdf',
  // blankBasePdfPath: false,
  dataTransformer: (data) => {
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
      name2: data.name,
      name3: data.name,
      name4: data.name,
      name5: data.name,
      name6: data.name,
      name7: data.name,
      name8: data.name,
      name9: data.name,
      name10: data.name,
      age2: data.age,
      age3: data.age,
      age4: data.age,
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
    };
  },
});
</script>