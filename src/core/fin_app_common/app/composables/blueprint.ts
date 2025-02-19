import type {
  FieldDefinition,
  NavigableItem as BlueprintNavigableItem,
  BlueprintContextParam,
  PageId,
  PageIdParam,
  ModuleBlueprint,
  ModuleRealmItemBlueprint,
  NestedInformationBlueprint,
  EntityLink,
  EntityBlueprint,
} from '@finsoft/blueprint';
import { appModules } from 'app-blueprint';
import * as v from 'valibot';
import { computed, ref } from 'vue';

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

function backendCaller(
  pageDef: ModuleRealmItemBlueprint,
  internal_used?: boolean = false
) {
  const pathUrl = pageDef.pathUrl;
  const route = useRoute();

  function list_core(_query?: MaybeRef<any>, optionalUrl?: string) {
    const getPath = optionalUrl || pathUrl.get || '';
    const baseUrl = getPath.startsWith('/api/')
      ? getPath
      : `${pageDef.dataPath}${getPath}`;
    const query = ref(_query);

    const { data, status, error } = useApiFetch(baseUrl, {
      query,
      default: () => ref<undefined>([] as unknown as undefined),
    });

    return {
      data,
      status,
      error,
    };
  }

  function list(query?: Record<string, any>) {
    return list_core(query);
  }

  function get(_id?: MaybeRef<string>) {
    const refid = ref(_id);
    const id = computed(() => refid.value ?? route.params.id);
    const url = computed(() => {
      const getSegment = pathUrl.get || '';
      const getPath = getSegment.replace('/:id', `/${id.value}`);
      return `${pageDef.dataPath}${getPath}`;
    });

    const { data, status, error } = useApiFetch(() => url.value, {
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

  async function store<T extends Record<string, any> | BodyInit>(
    data2update: T
  ) {
    const undata = unref(data2update) as any;
    const method = 'POST';
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

  return internal_used
    ? { list: list_core, get, update, store }
    : { list, get, update, store };
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
  const _store = useLocalStepsData(pageDef.moduleName, pageDef.realmName);
  const { data } = storeToRefs(_store);

  function get() {
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

  async function store<T extends Record<string, any> | BodyInit>(
    data2store: T
  ) {
    status.value = 'loading';
    try {
      data.value = data2store;
      status.value = 'success';
    } catch (error) {
      state.error = error;
      status.value = 'error';
    }

    return data.value;
  }

  function clear() {
    // data.value = {};
    _store.clear();
  }

  return { data, get, update, store, clear };
}

export function useLinkQuery(link: EntityLink, forData?: MaybeRef<any>) {
  // TODO: implement
  if (!link) {
    throw new Error('Link must be defined');
  }
  const link2 = link.link2
    ? typeof link.link2 === 'string'
      ? { module: link.link2 }
      : link.link2
    : { module: link.name };
  const url =
    link2.module && link2.module.startsWith('/api/') ? link2.module : undefined;
  let pageDef: ModuleRealmItemBlueprint = {
    pathUrl: { file: '', page: '', get: url },
    dataPath: '',
    role: '',
    name: '',
    moduleName: '',
    realmName: '',
    pick: [],
    entity: {
      root: [],
      schema: v.object({}) as any,
    } as unknown as EntityBlueprint,
  };
  if (!url) {
    const pageId = convertParamToPageId({
      realm: 'list',
      page: 'root',
      ...link2,
    });
    pageDef = usePageDefinition(pageId);
  }
  const backend = backendCaller(pageDef, true);

  const refData = ref(forData);
  const searchQuery = computed(() => (search?: string) => {
    if (!link.query) {
      return {};
    }
    const staticQuery =
      typeof link.query === 'function'
        ? search === undefined
          ? {}
          : link.query(search, refData.value)
        : {
            [link.query.look4]: refData.value['id'],
          };
    return staticQuery;
  });

  const searchText = ref<string>();

  const query = computed(() => searchQuery.value(searchText.value));
  const { data, status, error } = backend.list(query);

  function search(text: string) {
    searchText.value = text;
    return new Promise((resolve, reject) => {
      if (status.value === 'success') {
        resolve(data.value);
      }
      watch(status, (newStatus) => {
        if (newStatus === 'success') {
          resolve(data.value);
        } else if (newStatus === 'error') {
          reject(error.value);
        }
      });
    });
  }

  const pageId = convertParamToPageId({
    module: link.name,
    realm: 'each',
    page: 'root',
  });
  const pageDefForGet = usePageDefinition(pageId);
  const backendForGet = backendCaller(pageDefForGet, true);
  function get(id: MaybeRef<string>) {
    return backendForGet.get(id);
  }
  function formatLinkValue(data: any, emptyText = '-') {
    return link.dataLabel ? link.dataLabel(data) : data['name'] || emptyText;
  }

  const { fields } = useEntitySchema(pageDef);
  const entries = ref(fields!);

  // TODO: Make use of component and resolver
  const columns = computed(() => {
    return (
      entries.value
        .flat()
        .filter((entry) => entry.component !== 'image')
        .map((entry) => ({
          key: entry.model,
          label: entry.label,
        })) || [
        {
          key: 'id',
          label: 'ID',
        },
      ]
    );
  });

  const createPageId = convertParamToPageId({
    module: link.name,
    realm: 'create',
    page: 'root',
  });

  return { search, searchText, data, status, error, get, formatLinkValue, columns, entries, createPageId };
}
