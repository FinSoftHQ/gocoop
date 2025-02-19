<template>
  <img :src="imageSrc" :alt />
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{ modelValue?: any, alt?: string }>()
const imageSrc = computed(() => {
  if (props.modelValue?.image) {
    return props.modelValue.image
  } else if (props.modelValue?.pic) {
    return props.modelValue.pic
  } else if (props.modelValue?.picture) {
    return props.modelValue.picture
  } else if (props.modelValue?.src) {
    return props.modelValue.src
  } else {
    return props.modelValue
  }
})
const alt = computed(() => props.alt || 'Image has no alt text')
</script>