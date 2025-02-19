<template>
  <component :is="currentRoleComponent" :pageId>
    <template
      v-if="$slots.default"
      #default="{ wrapped, entries, resolver }"
    >
      <slot
        :wrapped
        :entries
        :resolver
      ></slot>
    </template>
  </component>
  <RealmRolesMissing v-if="!currentRoleComponent"></RealmRolesMissing>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';
import RealmRolesSharedStepEdit from '../Roles/Shared/StepEdit.vue';
import RealmRolesSharedStepConfirm from '../Roles/Shared/StepConfirm.vue';
import RealmRolesCreateModalEdit from '../Roles/Create/ModalEdit.vue';
import RealmRolesCreateDefault from '../Roles/Create/Default.vue';
import RealmRolesSharedCustomView from '../Roles/Shared/CustomView.vue';

const baseRoles = useBaseRoles();
const roles: Record<string, any> = {
  ...baseRoles,
  stepedit: RealmRolesSharedStepEdit,
  stepconfirm: RealmRolesSharedStepConfirm,
  modaledit: RealmRolesCreateModalEdit,
  customview: RealmRolesSharedCustomView,
  default: RealmRolesCreateDefault,
};

const props = defineProps<{
  pageId: PageIdParam,
  role?: string,
}>();
const pageDef = usePageDefinition(props.pageId);

const role = computed<string>(() => props.role || pageDef.role || 'default');
const currentRoleComponent = computed(() => roles[role.value] || null);
</script>