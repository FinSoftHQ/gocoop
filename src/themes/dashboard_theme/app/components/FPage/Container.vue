<template>
  <UDashboardPage>

    <UDashboardPanel
      v-if="$slots.nav"
      :width="250"
      class="px-6"
    >
      <slot name="nav"></slot>
    </UDashboardPanel>

    <UDashboardPanel grow>
      <slot></slot>
    </UDashboardPanel>

    <UDashboardPanel v-if="$slots.side">
      <slot name="side"></slot>
    </UDashboardPanel>

  </UDashboardPage>
</template>
