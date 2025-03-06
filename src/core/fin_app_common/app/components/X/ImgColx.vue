<template>
  <FItemGrid
    col="x2"
    v-if="data"
  >
    <EntitySection
      v-model="data"
      :entries
      :resolver
      :pick="['memberid']"
    ></EntitySection>
    <FItemGrid
      col="x2"
      class="flex justify-end"
    >
      <div>
        <p>รูปสมาชิก</p>
        <FieldViewImage
          v-if="data.photo"
          v-model="data.photo"
          :entries
          :resolver
          class="image-500"
        ></FieldViewImage>
        <p v-else>ไม่มีรูปภาพ</p>
      </div>
      <div>
        <p>ลายเซ็น</p>
        <FieldViewImage
          v-if="data.signature"
          v-model="data.signature"
          :entries
          :resolver
          class="image-500"
        >
        </FieldViewImage>
        <p v-else>ไม่มีรูปภาพ</p>
      </div>
    </FItemGrid>
  </FItemGrid>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
  entries: any;
  resolver: any;
}>();
const data = ref<any>({});

data.value = props.modelValue;
watch(() => props.modelValue, (val) => {
  data.value = val;
});
</script>

<style scoped>
.image-500 {
  width: 250px;
  height: auto;
}
</style>