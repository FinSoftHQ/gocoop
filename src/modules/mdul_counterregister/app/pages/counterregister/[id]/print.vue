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
    };
  },
});
</script>