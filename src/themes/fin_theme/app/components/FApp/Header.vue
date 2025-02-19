<template>
  <UHeader :links="links">
    <template #logo>
      Fin Theme
      <UBadge
        label="Starter"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UButton
        label="Sign in"
        color="gray"
        to="/login"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="links"
        default-open
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const links = inject<any[]>('app-links', [])
</script>
