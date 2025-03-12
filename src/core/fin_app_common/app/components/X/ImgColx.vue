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
        <p class="text-center mb-1 font-bold">
          รูปสมาชิก
          <span v-if="data.photo" class="text-green-500">✔️</span>
          <span v-else class="text-red-500">❌</span>
        </p>
        <UCard>
        <FieldViewImage
          v-if="data.photo"
          v-model="data.photo"
          :entries
          :resolver
          class="image-500"
        ></FieldViewImage>
        <p v-else class="text-center mt-24 mb-28 font-bold text-gray-400">ยังไม่มีรูปภาพ</p>
        </UCard>
      </div>
      <div>
        <p class="text-center mb-1 font-bold">ลายเซ็น
              <span v-if="data.signature" class="text-green-500">✔️</span>
          <span v-else class="text-red-500">❌</span>
        </p>
        <UCard>
        <FieldViewImage
          v-if="data.signature"
          v-model="data.signature"
          :entries
          :resolver
          class="image-500"
        >
        </FieldViewImage>
        <p v-else class="text-center mt-24 mb-28 font-bold text-gray-400">ยังไม่มีลายเซ็น</p>
      </UCard>
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