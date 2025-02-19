import type { PageIdParam } from "@finsoft/blueprint";
import { paramToPageId } from "~/composables/blueprint";

type ModuleSelectionInfo = {
  module: string;
  pageId: PageIdParam;
  selected: string;
};

const useLinkModuleStore = defineStore(`link-module-selection`, () => {
  const moduleSelections = ref<Record<string, ModuleSelectionInfo>>({});
  const lastModule = ref<string>();

  function setModuleSelection(pageId: PageIdParam, selected: string) {
    const module = pageId.module!;
    moduleSelections.value[module] = { module, pageId, selected };
    lastModule.value = module;
  }

  function getModuleSelection(module: string): ModuleSelectionInfo | undefined {
    return moduleSelections.value[module];
  }

  function getLatestModuleSelection(): ModuleSelectionInfo | undefined {
    return moduleSelections.value[lastModule.value || ''];
  }

  return {
    moduleSelections,
    lastModule,
    setModuleSelection,
    getModuleSelection,
    getLatestModuleSelection,
  };
});

export function useLinkModuleSelection(pageId: PageIdParam, selected: string) {
  if (!pageId.module) {
    throw new Error('pageId.module is required');
  }
  const store = useLinkModuleStore();
  store.setModuleSelection(pageId, selected);
}

const default_id = { realm: 'each', page: 'root' };
export function useLinkModule(module?: string) {
  const store = useLinkModuleStore();
  const info = module ? store.getModuleSelection(module) : store.getLatestModuleSelection();
  if (!info) {
    return info;
  }
  const { pageId, ...rest } = info;
  const id = {
    ...default_id,
    ...pageId,
  };
  return { pageId: paramToPageId(id), ...rest };
}