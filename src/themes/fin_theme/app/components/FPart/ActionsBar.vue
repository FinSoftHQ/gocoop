<template>
  <div class="flex-shrink-0 flex items-center py-2 gap-x-4">
    <div class="flex items-center justify-between flex-1 gap-x-4">
      <slot>
        <div class="flex items-stretch gap-1.5">
          <slot name="left"></slot>
        </div>

        <div class="flex items-stretch gap-1.5">
          <slot name="right"></slot>
        </div>
      </slot>
    </div>
  </div>
</template>