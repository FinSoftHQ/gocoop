<template>
  <FPageContainer>
    <h1>Redirecting ...</h1>
  </FPageContainer>
</template>

<script setup lang="ts">
navigateTo({ name: 'counterverify.list.root' }, { replace: true });
</script>