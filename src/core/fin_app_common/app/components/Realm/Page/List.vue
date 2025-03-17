<template>
  <component :is="currentRoleComponent" :pageId>
    <template
      v-if="$slots.default"
      #default="{ wrapped, error, loading, columns, entries, resolver }"
    >
      <slot
        :wrapped
        :error
        :loading
        :columns
        :entries
        :resolver
      ></slot>
    </template>
  </component>
  <RealmRolesMissing v-if="!currentRoleComponent"></RealmRolesMissing>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';
import RealmRolesListDefault from '../Roles/List/Default.vue';
import RealmRolesListWebPrint from '../Roles/List/WebPrint.vue';
import RealmRolesSharedCustomView from '../Roles/Shared/CustomView.vue';
import RealmRolesSharedMenu from '../Roles/Shared/Menu.vue';
import RealmRolesSharedResult from '../Roles/Shared/Result.vue';
import RealmRolesXClosed from '../Roles/X/Closed.vue';
import RealmRoleListShowQR from '../Roles/List/ShowQR.vue';

const baseRoles = useBaseRoles();
const roles: Record<string, any> = {
  ...baseRoles,
  webprint: RealmRolesListWebPrint,
  customview: RealmRolesSharedCustomView,
  menu: RealmRolesSharedMenu,
  result: RealmRolesSharedResult,
  default: RealmRolesListDefault,
  closed: RealmRolesXClosed,
  showqr: RealmRoleListShowQR,
};

const props = defineProps<{
  pageId: PageIdParam,
  role?: string,
}>();
const pageDef = usePageDefinition(props.pageId);

const role = computed<string>(() => props.role || pageDef.role || 'default');
const currentRoleComponent = computed(() => roles[role.value] || null);
</script>