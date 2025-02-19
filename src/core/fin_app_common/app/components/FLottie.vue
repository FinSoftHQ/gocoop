<template>
  <DotLottieVue :autoplay :src />
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const props = withDefaults(defineProps<{
  autoplay?: boolean,
  src: string,
}>(), { autoplay: true });
</script>