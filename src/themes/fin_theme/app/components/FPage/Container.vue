<template>
  <UContainer>
    <UPage>

      <template
        #left
        v-if="$slots.nav"
      >
        <slot name="nav"></slot>
      </template>

      <slot></slot>

      <template
        #right
        v-if="$slots.side"
      >
        <slot name="side"></slot>
      </template>

    </UPage>
  </UContainer>
</template>
