<template>
  <h1>Redirecting ...</h1>
</template>

<script setup lang="ts">
navigateTo({ name: '{{ name }}.list.root' }, { replace: true });
</script>