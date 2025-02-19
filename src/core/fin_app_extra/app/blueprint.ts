import type {
  FieldDefinition,
  NavigableItem as BlueprintNavigableItem,
  BlueprintContextParam,
  PageId,
  PageIdParam,
  ModuleBlueprint,
  ModuleRealmItemBlueprint,
  NestedInformationBlueprint,
} from '@finsoft/blueprint';
import { appModules } from 'app-blueprint';

export type NavigableItem = BlueprintNavigableItem;

export function useBlueprintModule(name: string) {
  return appModules[name];
}

function convertParamToPageId(id: PageIdParam | PageId): PageId {
  if ('module' in id && 'realm' in id && 'page' in id) {
    return id as PageId;
  }

  const default_context = {
    app: 'sample',
    module: 'finsoft',
    realm: 'list',
  };

  const currentContext = getBlueprintContext();

  return {
    ...default_context,
    ...currentContext,
    ...id,
  };
}

export const paramToPageId = convertParamToPageId;

export function idToPageName(pageId: PageIdParam | PageId) {
  const id = convertParamToPageId(pageId);
  return `${id.module}.${id.realm}.${id.page}`;
}

function backendCaller(pageDef: ModuleRealmItemBlueprint) {
  const pathUrl = pageDef.pathUrl;
  const route = useRoute();

  async function list() {
    const getPath = pathUrl.get || '';
    const url = getPath.startsWith('/api/') ? getPath : `${pageDef.dataPath}${getPath}`;
    const { data, status, error } = await useApiFetch(url, {
      default: () => ref<undefined>([] as unknown as undefined),
    });

    return {
      data,
      status,
      error,
    };
  }

  async function get(_id?: MaybeRef<string>) {
    const refid = ref(_id);
    const id = computed(() => refid.value ?? route.params.id);
    const url = computed(() => {
      const getSegment = pathUrl.get || '';
      const getPath = getSegment.replace('/:id', `/${id.value}`);
      return `${pageDef.dataPath}${getPath}`;
    });

    const { data, status, error } = await useApiFetch(() => url.value, {
      default: () => ref<undefined>({} as unknown as undefined),
    });

    return {
      data,
      status,
      error,
    };
  }

  async function update<T extends Record<string, any> | BodyInit>(
    data2update: T
  ) {
    const undata = unref(data2update) as any;
    const method = pageDef.realmName === 'each' ? 'PUT' : 'POST';
    const id = route.params.id;
    const postSegment = pathUrl.post || '';
    const postPath = postSegment.replace('/:id', `/${id}`);
    const url = `${pageDef.dataPath}${postPath}`;

    if (undata.id) {
      delete undata.id;
    }

    const result = await (useNuxtApp() as any).$api(url, {
      method,
      body: undata,
    });

    return result;
  }

  return { list, get, update };
}

export type PageDefinition = ReturnType<typeof usePageDefinition>;
export function usePageDefinition(id: PageIdParam) {
  const pageId = convertParamToPageId(id);

  const pageName = idToPageName(pageId);

  const info = appModules[pageId.module]!;
  const pageDef = info._refMap.get(`${pageId.realm}.${pageId.page}`)!;
  const steps = pageDef?.steps?.buildSteps(pageId);

  const hasPrevPage = !!steps?.prevStep;
  const currentStepIndex = steps?.currentStepIndex;

  return {
    defined: true,
    pageId,
    pageName,
    hasPrevPage,
    currentStepIndex,
    ...pageDef,
  };
}

export function usePageFunctions(pageDef: PageDefinition) {
  const pageId = pageDef.pageId;

  function relativeName(target: PageIdParam | PageId): string {
    return idToPageName({
      ...pageId,
      ...target,
    });
  }

  const steps = pageDef?.steps?.buildSteps(pageId);

  function nextPageId(fallbackPageId: PageIdParam): string {
    const page = steps?.nextStep;
    return relativeName(page ? page : fallbackPageId);
  }
  function prevPageId(fallbackPageId: PageIdParam): string {
    const page = steps?.prevStep;
    return relativeName(page ? page : fallbackPageId);
  }

  return {
    backendCaller: backendCaller(pageDef),
    localState: buildLocalStateStore(pageDef),
    relativeName,
    nextPageId,
    prevPageId,
  };
}

export function useEntitySchema(pageDef: ModuleRealmItemBlueprint) {
  const entity = pageDef?.entity;
  const subName = pageDef?.subName;

  if (!subName) {
    return {
      schema: entity.schema,
      fields: entity.root,
    };
  }

  const subs = entity.sub as NestedInformationBlueprint[];
  const subEntity = subs.find((sub) => sub.name === subName);
  return {
    schema: subEntity?.schema,
    fields: subEntity?.fields,
  };
}

const KEY_BLUEPRINT_CONTEXT = 'ctx-app-blueprint-context';
export function setBlueprintContext(
  context: BlueprintContextParam,
  provideModuleInfo?: boolean
) {
  const currentContext = inject(
    KEY_BLUEPRINT_CONTEXT,
    {} as BlueprintContextParam
  );
  const newContext = {
    ...currentContext,
    ...context,
  };
  provide(KEY_BLUEPRINT_CONTEXT, newContext);

  if (provideModuleInfo) {
    provideModuleInfoToBlueprint(newContext);
  }

  return newContext;
}

function getBlueprintContext() {
  return inject(KEY_BLUEPRINT_CONTEXT, {} as BlueprintContextParam);
}
function provideModuleInfoToBlueprint(moduleContext: BlueprintContextParam) {
  const { app, module } = moduleContext;
  const info = appModules[module!];
  const editPage = info?._refMap.get('each.edit');
  const editable = !!editPage;
  const moduleInfo = {
    app,
    module,
    label: info?.label,
    dataPath: info?.dataPath,
    icon: info?.icon,
    editable,
  };

  provide('module-info', moduleInfo);
}

export function useContextualModuleInfo() {
  return inject('module-info', {} as any);
}

function buildLocalStateStore(pageDef: ModuleRealmItemBlueprint) {
  const state = reactive({
    error: null as any,
  });
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const store = useLocalStepsData(pageDef.moduleName, pageDef.realmName);
  const { data } = storeToRefs(store);

  async function get() {
    status.value = 'loading';
    try {
      status.value = 'success';
    } catch (error) {
      state.error = error;
      status.value = 'error';
    }

    return { data, status, error: state.error };
  }

  async function update<T extends Record<string, any> | BodyInit>(
    data2update: T
  ) {
    status.value = 'loading';
    try {
      data.value = data2update;
      status.value = 'success';
    } catch (error) {
      state.error = error;
      status.value = 'error';
    }

    return data.value;
  }

  return { data, get, update };
}
