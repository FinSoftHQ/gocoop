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
import RealmRolesEachEdit from '../Roles/Each/Edit.vue';
import RealmRolesSharedStepEdit from '../Roles/Shared/StepEdit.vue';
import RealmRolesSharedStepConfirm from '../Roles/Shared/StepConfirm.vue';
import RealmRolesEachModalEdit from '../Roles/Each/ModalEdit.vue';
import RealmRolesEachWebPrint from '../Roles/Each/WebPrint.vue';
import RealmRolesEachDefault from '../Roles/Each/Default.vue';
import RealmRolesSharedCustomView from '../Roles/Shared/CustomView.vue';
import RealmRolesSharedResult from '../Roles/Shared/Result.vue';
import RealmRolesSharedMenu from '../Roles/Shared/Menu.vue';
import RealmRolesCustonStepMobilePhoto from '../Roles/Custon/StepMobilePhoto.vue';
import RealmRolesCustonStepMobileQr from '../Roles/Custon/StepMobileQr.vue';
import RealmRolesCustomTakePhoto from '../Roles/Custon/TakePhoto.vue';
import RealmRolesScanner from '../Roles/Custon/Scanner.vue';
import RealmRoleListShowQrCode from '../Roles/Custom/ShowQrCode.vue';


const baseRoles = useBaseRoles();
const roles: Record<string, any> = {
  ...baseRoles,
  edit: RealmRolesEachEdit,
  stepedit: RealmRolesSharedStepEdit,
  stepconfirm: RealmRolesSharedStepConfirm,
  modaledit: RealmRolesEachModalEdit,
  result: RealmRolesSharedResult,
  menu: RealmRolesSharedMenu,
  customview: RealmRolesSharedCustomView,
  webprint: RealmRolesEachWebPrint,
  default: RealmRolesEachDefault,
  stepmobilephoto: RealmRolesCustonStepMobilePhoto,
  stepmobileqr: RealmRolesCustonStepMobileQr,
  takephoto: RealmRolesCustomTakePhoto,
  scanner: RealmRolesScanner,
  showqrcode: RealmRoleListShowQrCode,
};

const props = defineProps<{
  pageId: PageIdParam,
  role?: string,
}>();
const pageDef = usePageDefinition(props.pageId);

const role = computed<string>(() => props.role || pageDef.role || 'default');
const currentRoleComponent = computed(() => roles[role.value] || null);
</script>