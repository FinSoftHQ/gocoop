import * as v from 'valibot';

export interface NuxtLinkProps {
  to?: string | any;
  external?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  rel?:
    | 'noopener'
    | 'noreferrer'
    | 'nofollow'
    | 'sponsored'
    | 'ugc'
    | (string & {})
    | null;
  noRel?: boolean;
  prefetchedClass?: string;
  prefetch?: boolean;
  prefetchOn?:
    | 'visibility'
    | 'interaction'
    | Partial<{
        visibility: boolean;
        interaction: boolean;
      }>;
  noPrefetch?: boolean;
}
export interface NavigableItem extends NuxtLinkProps {
  label: string;
  labelClass?: string;
  slot?: string;
  icon?: string;
  iconClass?: string;
  shortcuts?: string[];
  disabled?: boolean;
  class?: string;
  color?: string;
  click?: (...args: any[]) => void;
}
export interface ChoiceItem extends NavigableItem {
  value: string | any;
}

export type BlueprintContextParam = {
  app?: string;
  module?: string;
  realm?: string;
  page?: string;
};

export type PageIdParam = {
  app?: string;
  module?: string;
  realm?: string;
  page: string;
};
export type PageId = {
  app: string;
  module: string;
  realm: string;
  page: string;
};

export type PageActionableLink =
  | string
  | {
      label: string;
      labelClass?: string;
      slot?: string;
      icon?: string;
      iconClass?: string;
      shortcuts?: string[];

      to: PageIdParam;
    };

// export type RealmIdParam = {
//   app?: string;
//   module?: string;
//   realm: string;
// };
// export type RealmId = {
//   app: string;
//   module: string;
//   realm: string;
// };

// export type ModuleIdParam = {
//   app?: string;
//   module: string;
// };
// export type ModuleId = {
//   app: string;
//   module: string;
// };

export type EntityLink = {
  name: string;
  component?: string;
  link2?: string | PageIdParam;
  dataLabel?: (data: any) => string;
  query?: { look4: string } | ((search?: string, data?: any) => Record<string, any>);
};
export type FieldDefinition = {
  model: string;
  component: string;
  spec: object;
  label: string;
  hint?: string;
  placeholder?: string;
  icon?: string;
  link?: EntityLink;
  choices?: ChoiceListArrayDefinition;
};

export type DataDefinition = (FieldDefinition | FieldDefinition[])[];

export type NestedInformationDefinition = {
  name: string;
  ordinal?: '1' | '*';
  component: string;
  fields: DataDefinition;
};

// export type ReferenceCollectionDefinition = {
//   name: string;
//   // ordinal: '1' | '*';
//   component: string;
//   link2: string;
//   look4: string;
//   // entity: EntityBlueprint;
//   pick?: string[]; // Pick the fields to be presented, if not provided, all fields will be presented.
// };

export type EntityDefinition = {
  name: string;
  root: DataDefinition;
  sub?: NestedInformationDefinition[];
  links?: EntityLink[];
};
type NamedEntityDefinition = {
  name: string;
  root: DataDefinition;
  sub?: NestedInformationDefinition[];
  links?: EntityLink[];
};

export type NestedInformationBlueprint = {
  name: string;
  ordinal: '1' | '*';
  component: string;
  fields: DataDefinition;
  schema: v.ObjectSchema<any, any>;
};

export type ReferenceCollectionBlueprint = {
  name: string;
  // ordinal: '1' | '*';
  component: string;
  link2: string;
  look4: string;
  // entity: EntityBlueprint;
  pick: string[]; // Pick the fields to be presented, if not provided, all fields will be presented.
};

// TODO: Polishing
export type EntityBlueprint = {
  name: string;
  root: DataDefinition;
  schema: v.ObjectSchema<any, any>;
  sub?: NestedInformationBlueprint[];
  links?: Record<string, EntityLink>;
};

export type ModuleRealmItemDefinition = {
  label?: string;
  icon?: string;
  role?: string;
  entity: EntityBlueprint;
  subName?: string; // Sub name for the data
  component?: string;
  steps?: RealmStepsBlueprint;
  tabs?: PageActionableLink[];
  actions?: PageActionableLink[];
  smartContract?: string;
  post?: string | boolean; // Will make the post request
  // Will make the get request
  // '.' for just the root, '+' for append subName, '-' for no get request, everything else is the path to get request
  get?: string;
  getnot?: boolean; // Don't need to make the get request
  pick?: string[]; // Pick the fields to be presented, if not provided, all fields will be presented.
  links?: string[];
};

export type ModuleRealmDefinition = {
  root: ModuleRealmItemDefinition | EntityBlueprint;
  [key: string]: ModuleRealmItemDefinition | EntityBlueprint | undefined;
};

export type BlueprintModuleDefinition = {
  label?: string;
  dataPath?: string;
  icon?: string;
  list: ModuleRealmDefinition;
  create: ModuleRealmDefinition;
  each: ModuleRealmDefinition;
};
type NamedBlueprintModuleDefinition = {
  name: string;
  label?: string;
  dataPath?: string;
  icon?: string;
  list: ModuleRealmDefinition;
  create: ModuleRealmDefinition;
  each: ModuleRealmDefinition;
};

export type ModuleBlueprint = {
  name: string;
  label: string;
  dataPath: string;
  icon?: string;
  list: ModuleRealmBlueprint;
  create: ModuleRealmBlueprint;
  each: ModuleRealmBlueprint;
  _refMap: Map<string, ModuleRealmItemBlueprint>;
};

function defineEnityLinks(links?: EntityLink[]): Record<string, EntityLink> {
  if (!links) return {};

  const _links = links.map((link) => {
    return [link.name, link] as [string, EntityLink];
  });
  return Object.fromEntries(_links);
}
function defineEntity(definition: NamedEntityDefinition): EntityBlueprint {
  const _definition = {
    name: definition.name,
    root: parseFormEntries(definition.root),
    schema: parseObjectSchema(definition.root),
    sub: definition.sub?.map((sub) => ({
      name: sub.name,
      component: sub.component,
      ordinal: sub.ordinal ?? '*',
      fields: parseFormEntries(sub.fields),
      schema: parseObjectSchema(sub.fields),
    })),
    links: defineEnityLinks(definition.links),
  };
  return _definition;
}
function defineEntities(definition: Record<string, EntityDefinition>) {
  const entities = Object.entries(definition).map(([name, entity]) => {
    const namedEntity = { ...entity, name };
    const _entity = defineEntity(namedEntity);
    return [name, _entity] as [string, EntityBlueprint];
  });

  return Object.fromEntries(entities);
}

function parseObjectSchema(dataDef: DataDefinition) {
  const entries = dataDef
    .flat()
    .map((def) => [
      def.model,
      Object.keys(def.spec).length === 0 ? v.any() : def.spec,
    ]);
  return v.object(Object.fromEntries(entries));
}

export const safeSchemaParser = v.safeParser;

function parseFormEntries(defEntries: DataDefinition) {
  return defEntries.map((field) =>
    Array.isArray(field) ? field : [field]
  ) as DataDefinition;
}

var TEMP_app = '';

export type ModuleRealmItemBlueprint = {
  name: string;
  label?: string;
  icon?: string;
  role: string;
  entity: EntityBlueprint;
  subName?: string; // Sub name for the data
  component?: string;
  dataPath: string;
  moduleName: string;
  realmName: string;
  steps?: RealmStepsBlueprint;
  tabs?: NavigableItem[];
  actions?: NavigableItem[];
  smartContract?: string;
  next?: string;
  pick: string[]; // Pick the fields to be presented, if not provided, all fields will be presented.
  links?: EntityLink[];
  pathUrl: { file: string; page: string; post?: string; get?: string };
};
export type ModuleRealmBlueprint = {
  root: ModuleRealmItemBlueprint;
  others: ModuleRealmItemBlueprint[];
};
function defineModule(
  _definition: NamedBlueprintModuleDefinition
): ModuleBlueprint {
  const name = _definition.name;
  const label = _definition.label ?? name;
  const dataPath = _definition.dataPath ?? name;
  const icon = _definition.icon;

  // '.' for just the root, '+' for append subName, '-' for no get request, everything else is the path to get request
  function _pathToUrl(
    path: string | undefined,
    apiPath: string,
    subName?: string
  ) {
    const _path = path || '..';
    switch (_path) {
      case '.':
        return apiPath;
      case '+':
        return subName ? `${apiPath}/${subName}` : `${apiPath}`;
      case '-':
        return undefined;
      case '..':
        return apiPath.replace(/\/[^/]+$/, '');
      default:
        return !_path.startsWith('/') ? `/${path}` : path;
    }
  }

  const _listRealmToUrl = (
    path: string,
    postPath: string | boolean,
    getPath?: string,
    subName?: string
  ) => {
    const file = path === 'root' ? '/list' : `/list/${path}`;
    const page = path === 'root' ? '/list' : `/list/${path}`;
    const apiPath = path === 'root' ? '/list' : `/_by_${path}`;
    const post =
      postPath == false
        ? undefined
        : _pathToUrl(postPath === true ? '..' : postPath, apiPath, subName);
    const get = _pathToUrl(getPath, apiPath, subName);
    return { file, page, post, get };
  };
  const _createRealmToUrl = (
    path: string,
    postPath: string | boolean,
    getPath?: string,
    subName?: string
  ) => {
    const file = path === 'root' ? '/create' : `/create/${path}`;
    const page = path === 'root' ? '/create' : `/create/${path}`;
    const apiPath = path === 'root' ? '/create' : `/${path}`;
    const post =
      postPath == false
        ? undefined
        : _pathToUrl(postPath === true ? '..' : postPath, apiPath, subName);
    const get = _pathToUrl(getPath, apiPath, subName);
    return { file, page, post, get };
  };
  const _eachRealmToUrl = (
    path: string,
    postPath: string | boolean,
    getPath?: string,
    subName?: string
  ) => {
    const file = path === 'root' ? '/:id' : `/:id/${path}`;
    const page = path === 'root' ? '/:id' : `/:id/${path}`;
    const post =
      postPath == false
        ? undefined
        : _pathToUrl(
            postPath === true ? (path === 'root' ? '.' : '..') : postPath,
            page,
            subName
          );
    const get = _pathToUrl(
      getPath || (path === 'root' ? '.' : '..'),
      page,
      subName
    );
    return { file, page, post, get };
  };

  function _mapRealmItem(
    key: string,
    realmName: string,
    item: EntityBlueprint | ModuleRealmItemDefinition,
    _realmToUrl: (
      path: string,
      postPath: string | boolean,
      getPath?: string,
      subName?: string
    ) => { file: string; page: string; post?: string; get?: string }
  ): ModuleRealmItemBlueprint {
    const _item: any = item;
    const pageId = { app: TEMP_app, module: name, realm: realmName, page: key };
    if (!!_item.entity) {
      // item is ModuleRealmItemDefinition
      const realmItem = _item as ModuleRealmItemDefinition;
      const links = realmItem.links?.map((link) => {
        // if (!_item.entity.links[link]) {
        //   throw new Error(
        //     `Entity link "${link}" not found in entity "${_item.entity.name}"`
        //   );
        // }
        return _item.entity.links[link];
      });
      // const fields = !realmItem.subName
      //   ? realmItem.entity.root
      //   : realmItem.entity.sub?.find((it) => it.name === realmItem.subName)
      //       ?.fields ?? [];
      // const schema = parseObjectSchema(fields);
      return {
        name: key,
        label: realmItem?.label,
        icon: realmItem.icon,
        role: realmItem.role ?? 'default',
        entity: realmItem.entity,
        subName: realmItem.subName,
        component: realmItem.component,
        // fields,
        dataPath,
        moduleName: name,
        realmName,
        // schema,
        smartContract: realmItem.smartContract,
        steps: realmItem.steps,
        tabs: realmItem.tabs
          ? defineRealItemActions(pageId, realmItem.tabs)
          : undefined,
        actions: realmItem.actions
          ? defineRealItemActions(pageId, realmItem.actions)
          : undefined,
        pick: realmItem.pick ?? [],
        links,
        pathUrl: _realmToUrl(
          key,
          realmItem.post ?? false,
          realmItem.get,
          realmItem.subName
        ),
      };
    } else {
      // item is EntityBlueprint
      const realmItem = _item as EntityBlueprint;
      // const fields = realmItem.root;
      // const schema = parseObjectSchema(fields);
      return {
        name: key,
        role: 'default',
        entity: realmItem,
        // fields,
        dataPath,
        moduleName: name,
        realmName,
        // schema,
        pick: [],
        links: [],  // TODO: Check if we need to define links for EntityBlueprint
        pathUrl: _realmToUrl(key, false, undefined, undefined),
      };
    }
  }

  const _realmMap = [] as [string, ModuleRealmItemBlueprint][];
  function _mapRealm(
    realmName: string,
    realm: ModuleRealmDefinition,
    _realmToUrl: (
      path: string,
      postPath: string | boolean,
      getPath?: string,
      subName?: string
    ) => { file: string; page: string; post?: string; get?: string }
  ) {
    let root = {} as ModuleRealmItemBlueprint;
    let others = [] as ModuleRealmItemBlueprint[];
    for (const key in realm) {
      const _realm = realm[key];
      if (!!_realm) {
        const _item = _mapRealmItem(key, realmName, _realm, _realmToUrl);
        if (key === 'root') {
          root = _item;
        } else {
          others.push(_item);
        }
        _realmMap.push([`${realmName}.${key}`, _item]);
      }
    }
    return { root, others } as ModuleRealmBlueprint;
  }

  const list = _mapRealm('list', _definition.list, _listRealmToUrl);
  const create = _mapRealm('create', _definition.create, _createRealmToUrl);
  const each = _mapRealm('each', _definition.each, _eachRealmToUrl);

  return {
    name,
    label,
    dataPath,
    icon,
    list,
    create,
    each,
    _refMap: new Map(_realmMap),
  };
}

function defineAppModules(
  definition: Record<string, BlueprintModuleDefinition>
) {
  const modules = Object.entries(definition).map(([name, module]) => {
    const namedModule = { ...module, name };
    const _module = defineModule(namedModule);
    return [name, _module] as [string, ModuleBlueprint];
  });
  return Object.fromEntries(modules) as Record<string, ModuleBlueprint>;
}

// TODO: Define choices list, or we dont' need it?
export type ChoiceListDefinition = {
  modelLabel?: string;
  modelValue?: string;
  modelIcon?: string;
  choices: object[];
};

// const choicesMap = new Map<string, ChoiceListArrayDefinition>();
// function defineChoicesList(
//   name: string,
//   definition:
//     | ChoiceListDefinition
//     | ChoiceListArrayDefinition
//     | ChoiceListSimpleDefinition
// ): string {
//   let _arrayDefinition = [] as ChoiceListArrayDefinition;
//   if (typeof definition === 'object' && !Array.isArray(definition)) {
//     // definition is ChoiceListDefinition or ChoiceListSimpleDefinition
//     if (!!definition.choices) {
//       // definition is ChoiceListDefinition
//       const _defin = definition as ChoiceListDefinition;
//       const modelValue = _defin.modelValue || 'value';
//       const modelLabel = _defin.modelLabel || 'label';
//       const modelIcon = _defin.modelIcon;
//       const choices = _defin.choices;

//       _arrayDefinition = choices.map((choice: any) => ({
//         label: choice[modelLabel],
//         value: choice[modelValue],
//         icon: modelIcon ? choice[modelIcon] : undefined,
//       })) as ChoiceListArrayDefinition;
//     } else {
//       // definition is ChoiceListSimpleDefinition
//       _arrayDefinition = Object.entries(definition).map(([value, label]) => ({
//         label,
//         value,
//       })) as ChoiceListArrayDefinition;
//     }
//   } /*if (Array.isArray(definition))*/ else {
//     // definition is ChoiceListArrayDefinition
//     _arrayDefinition = definition;
//   }

//   choicesMap.set(name, _arrayDefinition);
//   return `list:${name}`;
// }

export type ChoiceListArrayDefinition = {
  label: string;
  value: string;
  icon?: string;
}[];
export type ChoiceListSimpleDefinition = Record<string, string>;
function buildChoices(choices: ChoiceListSimpleDefinition) {
  return Object.entries(choices).map(([value, label]) => ({
    label,
    value,
  }));
}
function defineChoices(
  definition: Record<
    string,
    ChoiceListSimpleDefinition | ChoiceListArrayDefinition
  >
): Record<string, ChoiceListArrayDefinition> {
  const choices = Object.entries(definition).map(([name, choice]) => {
    if (Array.isArray(choice))
      return [name, choice] as [string, ChoiceListArrayDefinition];

    const _choice = buildChoices(choice);
    return [name, _choice] as [string, ChoiceListArrayDefinition];
  });
  return Object.fromEntries(choices);
}

export type ChoicesLinkDefinition = {
  module: string;
  list?: string;
  labels?: string[];
  value?: string;
};
function buildChoicesLink(
  name: string,
  definition: ChoicesLinkDefinition | string
) {
  const fallback = {
    module: name,
    list: 'root',
    labels: ['name'],
    value: 'id',
  };
  const _definition =
    typeof definition === 'string' ? { module: definition } : definition;

  return {
    ...fallback,
    ..._definition,
  };
}
function defineLinkChoices(definition: Record<string, ChoicesLinkDefinition>) {
  const choices = Object.entries(definition).map(([name, choice]) => {
    const _choice = buildChoicesLink(name, choice);
    return [name, _choice] as [string, ChoicesLinkDefinition];
  });
  return Object.fromEntries(choices);
}

export type ModuleBlueprintReference = {
  name: string;
  blueprint: ModuleBlueprint;
  ref(key: string): ModuleRealmItemBlueprint | undefined;
};
// const moduleBlueprintMap = new Map<string, ModuleBlueprint>();
// export function registerModule(
//   _module: ModuleBlueprint
// ): ModuleBlueprintReference {
//   const _ref = (key: string) => {
//     const _blueprint = _module;
//     const _refMap = _blueprint._refMap;
//     return _refMap.get(key);
//   };
//   moduleBlueprintMap.set(_module.name, _module);
//   return {
//     name: _module.name,
//     blueprint: _module,
//     ref: _ref,
//   };
// }
export type StepDefinitionItem = {
  name: string;
  label: string;
  icon?: string;
  description?: string;
  to: PageIdParam;
};
export type StepDefinitionItemBlueprint = {
  index: number;
  name: string;
  label: string;
  icon?: string;
  description?: string;
  to: PageIdParam;
};
export type RealmStepsDefinition =
  | (string | StepDefinitionItem)[]
  | Record<string, string>;
function defineSteps(definition: Record<string, RealmStepsDefinition>) {
  const steps = Object.entries(definition).map(([name, steps]) => {
    return [name, defineStepsPattern(steps)] as [string, RealmStepsBlueprint];
  });
  return Object.fromEntries(steps);
}

export type RealmStepsBlueprint = {
  steps: StepDefinitionItemBlueprint[];
  buildSteps: (pageId: PageId) => {
    nextStep?: PageIdParam;
    prevStep?: PageIdParam;
    currentStepIndex: number;
  };
};
function defineStepsPattern(
  definition: RealmStepsDefinition
): RealmStepsBlueprint {
  const steps = buildStepItems(definition);
  return {
    steps,
    buildSteps: (_pageId: PageId) => {
      const nextStep = getNextStep(_pageId, steps);
      const prevStep = getPrevStep(_pageId, steps);
      const currentStepIndex = steps.findIndex(
        (it) => _pageId.page === it.name
      );

      return {
        nextStep,
        prevStep,
        currentStepIndex,
      };
    },
  };
}
function buildStepItems(steps: RealmStepsDefinition) {
  if (!Array.isArray(steps)) {
    return Object.entries(steps).map(([name, label], index) => ({
      index,
      name,
      label,
      to: { page: name },
    }));
  }
  return steps.map((name, index) => {
    if (typeof name === 'string') {
      return {
        index,
        name,
        label: name,
        to: { page: name },
      };
    }
    return { ...name, index };
  });
}
function getNextStep(
  currentPage: PageId,
  steps: StepDefinitionItemBlueprint[]
) {
  const index = steps.findIndex((it) => currentPage.page === it.name);
  if (index === -1 || index + 1 >= steps.length) return undefined;
  return steps[index + 1]?.to;
}
function getPrevStep(
  currentPage: PageId,
  steps: StepDefinitionItemBlueprint[]
) {
  const index = steps.findIndex((it) => currentPage.page === it.name);
  if (index === -1 || index - 1 < 0) return undefined;
  return steps[index - 1]?.to;
}

function defineRealItemActions(
  currentPage: PageId,
  actions: PageActionableLink[]
) {
  return actions.map((item) => {
    const action =
      typeof item === 'string'
        ? {
            label: item,
            to: {
              page: item.toLowerCase(),
            },
          }
        : item;
    return {
      ...action,
      to: {
        name: paramToPageName(action.to, currentPage),
      },
    };
  });
}

function paramToPageName(pageId: PageIdParam, currentPage: PageId): string {
  const id = {
    ...currentPage,
    ...pageId,
  };

  return `${id.module}.${id.realm}.${id.page}`;
}

export function createBigDataDefinitionBuilder(_app: string) {
  // TODO: Temporary exploratory.
  TEMP_app = _app;
  return {
    defineEntities,
    defineSteps,
    defineAppModules,
    // defineChoicesList,
    // registerModule,
    defineChoices,
    defineLinkChoices,
  };
}

// // HACK: Temporary exploratory.
// export function bigDataLinkFactory() {
//   const _getChoicesList = (name: string) => {
//     if (!name.startsWith('list:')) return [];
//     const key = name.slice(5);
//     return choicesMap.get(key);
//   };

//   return {
//     getChoicesList: _getChoicesList,
//   };
// }
