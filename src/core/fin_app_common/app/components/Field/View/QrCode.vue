<template>
  <img :src="qrcode" alt="QR Code" />
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{ modelValue?: any }>()
const text = computed(() => {
  if (props.modelValue?.qr) {
    return props.modelValue.qr
  } else if (props.modelValue?.qrCode) {
    return props.modelValue.qrCode
  } else {
    return props.modelValue
  }
})
const qrcode = useQRCode(text)
</script>