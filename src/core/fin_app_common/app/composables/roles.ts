import type { PageId, PageIdParam } from '@finsoft/blueprint';

export function useRoleForList(
  pageId: PageIdParam,
  options: {
    createPageId?: PageIdParam;
    createPageLabel?: string;
    title?: string;
    eachPageId?: PageIdParam;
    onSelected?: (
      item: any,
      navigatingPageId: PageIdParam
    ) => PageIdParam | undefined;
  } = {
    createPageId: { realm: 'create', page: 'root' },
    eachPageId: { realm: 'each', page: 'root' },
  }
) {
  const pageDef = usePageDefinition(pageId);
  const pageFunctions = usePageFunctions(pageDef);
  const title = computed(() => pageDef.label || options.title || 'List Items');
  const _FILTER_DROP_ITEMS_KEYS = 'drop';
  const dropActions = computed(
    () =>
      pageDef.actions?.filter((a) => a.slot === _FILTER_DROP_ITEMS_KEYS) || []
  );
  const barActions = computed(
    () =>
      pageDef.actions?.filter((a) => a.slot !== _FILTER_DROP_ITEMS_KEYS) || []
  );
  const titleActions = computed(() => [
    {
      label: options.createPageLabel || 'Create New',
      to: { name: pageFunctions.relativeName(options.createPageId!) },
    },
    ...dropActions.value,
  ]);

  function select(item: any) {
    const selectedPageId = options.onSelected
      ? options.onSelected(item, options.eachPageId!)
      : options.eachPageId!;
    navigateTo({
      name: pageFunctions.relativeName(selectedPageId || options.eachPageId!),
      params: { id: item.id },
    });
  }

  return {
    pageDef,
    pageFunctions,
    title,
    dropActions,
    barActions,
    titleActions,
    select,
  };
}

export function useRoleForEdit(
  pageId: PageIdParam,
  options?: {
    title?: string;
    nextPageWithId?: PageIdParam;
    nextPageNoId?: PageIdParam;
    loadDataHandler?: (
      pageFunctions: any,
      pageId: PageId,
      routeId?: string
    ) => { data: Ref<any>; status: Ref<any>; error?: Ref<any> };
    updateDataHandler?: (
      data2save: any,
      pageFunctions: any,
      pageId: PageId,
      routeId?: string
    ) => Promise<any>;
  }
) {
  const _options = Object.assign({}, options, {
    nextPageWithId: { realm: 'each', page: 'root' },
    nextPageNoId: { realm: 'list', page: 'root' },
  }) as {
    title?: string;
    nextPageWithId: PageIdParam;
    nextPageNoId: PageIdParam;
    loadDataHandler?: (
      pageFunctions: any,
      pageId: PageId,
      routeId?: string
    ) => { data: Ref<any>; status: Ref<any>; error?: Ref<any> };
    updateDataHandler?: (
      data2save: any,
      pageFunctions: any,
      pageId: PageId,
      routeId?: string
    ) => Promise<any>;
  };
  const pageDef = usePageDefinition(pageId);
  const pageFunctions = usePageFunctions(pageDef);
  const title = computed(() => pageDef.label || _options.title || 'Edit Item');
  const actions = computed(() => pageDef.actions || []);
  const route = useRoute();
  const routeId = route.params.id?.toString();
  const {
    data: retrieved,
    status,
    error,
  } = (_options.loadDataHandler
    ? _options.loadDataHandler(pageFunctions, pageDef.pageId, routeId)
    : pageFunctions.backendCaller.get(routeId));
  const data = ref<any>({});
  watchEffect(() => {
    if (status?.value === 'success') {
      data.value = Array.isArray(retrieved.value)
        ? retrieved.value[0]
        : retrieved.value;
    }
  });

  async function saveThenGoNextPage(data2save: any) {
    const result = _options.updateDataHandler
      ? await _options.updateDataHandler(
          data2save,
          pageFunctions,
          pageDef.pageId,
          routeId
        )
      : ((await pageFunctions.localState.update(data2save)) as any);

    if (result?.id) {
      await navigateTo({
        name: pageFunctions.nextPageId(_options.nextPageWithId),
        params: { id: result.id },
      });
    } else {
      await navigateTo({
        name: pageFunctions.nextPageId(_options.nextPageNoId),
      });
    }
  }

  return {
    pageDef,
    pageFunctions,
    title,
    actions,
    data,
    status,
    error,
    saveThenGoNextPage,
  };
}

export function useRoleForView(
  pageId: PageIdParam,
  options?: {
    title?: string;
    nextPageWithId?: PageIdParam;
    nextPageNoId?: PageIdParam;
    loadDataHandler?: (
      pageFunctions: any,
      pageId: PageId
    ) => { data: Ref<any>; status: Ref<any>; error?: Ref<any> };
  }
) {
  const _options = Object.assign({}, options, {
    nextPageWithId: { realm: 'each', page: 'root' },
    nextPageNoId: { realm: 'list', page: 'root' },
  }) as {
    title?: string;
    nextPageWithId: PageIdParam;
    nextPageNoId: PageIdParam;
    loadDataHandler?: (
      pageFunctions: any,
      pageId: PageId
    ) => { data: Ref<any>; status: Ref<any>; error?: Ref<any> };
  };
  const pageDef = usePageDefinition(pageId);
  const pageFunctions = usePageFunctions(pageDef);
  const title = computed(() => pageDef.label || _options.title || 'View Item');
  const actions = computed(() => pageDef.actions || []);
  const { data, status, error } = (_options.loadDataHandler
    ? _options.loadDataHandler(pageFunctions, pageDef.pageId)
    : pageFunctions.backendCaller.get());

  const route = useRoute();

  async function goNextPage() {
    if (route.params.id) {
      await navigateTo({
        name: pageFunctions.nextPageId(_options.nextPageWithId),
      });
    } else {
      await navigateTo({
        name: pageFunctions.nextPageId(_options.nextPageNoId),
      });
    }
  }

  return {
    pageDef,
    pageFunctions,
    title,
    actions,
    data,
    status,
    error,
    goNextPage,
  };
}
