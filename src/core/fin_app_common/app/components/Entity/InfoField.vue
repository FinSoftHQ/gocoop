<template>
  <dl>
    <dt class="text-sm text-gray-400">
      <UIcon
        v-if="props.icon"
        :name="props.icon"
        class="mr-1"
      />
      {{ label }}
    </dt>
    <dd class="text-md font-bold">
      <slot
        :data="model"
        :display
        :option="{ asIs: props.asIs, dateFormat: props.dateFormat, digit: props.digit, emptyLabel: props.emptyLabel }"
      >{{ display }}</slot>
    </dd>
  </dl>
</template>

<script setup lang="ts">
const model = defineModel<any>();
const props = withDefaults(defineProps<{
  label: string,
  asIs?: boolean,
  dateFormat?: string,
  digit?: number,
  icon?: string,
  emptyLabel?: string
}>(),
  { emptyLabel: '-' });

const { formatDisplay } = useDisplayField({
  asIs: props.asIs,
  dateFormat: props.dateFormat,
  digit: props.digit,
  emptyLabel: props.emptyLabel
});

const display = computed(() => formatDisplay(model.value));
</script>