import { appModules, data } from 'app-blueprint';

export default function (plop) {
  plop.setGenerator('app-module', {
    description: 'Nuxt extendable module project (layer)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Project name please',
      },
    ],
    actions: function (data) {
      const appModule = appModules[data.name];
      if (!appModule) {
        throw new Error(`Module '${data.name}' not found`);
      }
      const path = data.name;
      const label = appModule.label;
      const extData = { path, label };
      const moduleBasePath = `modules/mdul_{{snakeCase path}}`;
      return [
        appModule.label,
        ...generateNuxtProject(extData, moduleBasePath, 'appmodule'),
        ...generateModuleBaseFiles(extData, moduleBasePath),
        ...generateModuleRealmList(extData, appModule, moduleBasePath),
        ...generateModuleRealmCreate(extData, appModule, moduleBasePath),
        ...generateModuleRealmEach(extData, appModule, moduleBasePath),
      ];
    },
  });

  plop.setGenerator('nuxt-empty', {
    description: 'Nuxt empty project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Project name please',
      },
      {
        type: 'list',
        name: 'path2gen',
        message: "Where's the folder to place this project?",
        choices: [
          { name: 'Application', value: 'apps', checked: true },
          { name: 'Module', value: 'modules' },
          { name: 'Core', value: 'core' },
        ],
      },
    ],
    actions: (_data) =>
      generateNuxtProject({}, `{{path2gen}}/{{snakeCase name}}`, 'emptynuxt'),
  });

  plop.setGenerator('nuxt-base', {
    description: 'Nuxt extendable empty project (layer)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Project name please',
      },
      {
        type: 'list',
        name: 'path2gen',
        message: "Where's the folder to place this project?",
        choices: [
          { name: 'Core', value: 'core', checked: true },
          { name: 'Module', value: 'modules' },
          { name: 'Theme', value: 'themes' },
        ],
      },
    ],
    actions: (_data) =>
      generateNuxtProject({}, `{{path2gen}}/{{snakeCase name}}`, 'nuxtbase'),
  });

  plop.setGenerator('re-gen-pages', {
    description: 'Re-generate nuxt extendable module pages',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Project name please',
      },
    ],
    actions: function (data) {
      const appModule = appModules[data.name];
      if (!appModule) {
        throw new Error(`Module '${data.name}' not found`);
      }
      const path = data.name;
      const label = appModule.label;
      const extData = { path, label };
      const moduleBasePath = `modules/mdul_{{snakeCase path}}`;
      return [
        appModule.label,
        ...generateModuleRealmList(extData, appModule, moduleBasePath),
        ...generateModuleRealmCreate(extData, appModule, moduleBasePath),
        ...generateModuleRealmEach(extData, appModule, moduleBasePath),
      ];
    },
  });
}

function generateNuxtProject(data, destinationPath, path2template) {
  return [
    {
      type: 'addMany',
      destination: `../${destinationPath}/`,
      base: `templates/${path2template}/`,
      templateFiles: `templates/${path2template}/**/*.*`,
      data,
    },
  ];
}

function generateModuleBaseFiles(data, destinationPath) {
  return [
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}.vue`,
      templateFile: `templates/module-base/module.vue.hbs`,
      data,
    },
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}/index.vue`,
      templateFile: `templates/module-base/module-index.vue.hbs`,
      data,
    },
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/index.vue`,
      templateFile: `templates/module-base/index.vue.hbs`,
      data,
      force: true,
    },
  ];
}

function generateModuleRealmList(input_data, appModule, destinationPath) {
  const data = input_data;
  const baseList = generateModuleRealm('list', input_data, appModule, destinationPath);
  return [
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}/list/index.vue`,
      templateFile: `templates/module-list/list-index.vue`,
      data,
      skipIfExists: true,
    },
    ...baseList,
  ];
}

function generateModuleRealmCreate(input_data, appModule, destinationPath) {
  return generateModuleRealm('create', input_data, appModule, destinationPath);
}

function generateModuleRealmEach(input_data, appModule, destinationPath) {
  return generateModuleRealm('each', input_data, appModule, destinationPath);
}

function generateModuleRealm(type, input_data, appModule, destinationPath) {
  const data = { ...input_data, page: 'root' };
  const path2gen = type === 'each' ? '[id]' : type;
  const rootPageName = type === 'list' ? 'root' : 'index';
  const basis = [
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}/${path2gen}.vue`,
      templateFile: `templates/module-${type}/${type}.vue`,
      data,
      skipIfExists: true,
    },
    {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}/${path2gen}/${rootPageName}.vue`,
      templateFile: `templates/module-${type}/${type}-page.vue.hbs`,
      data,
      skipIfExists: true,
    },
  ];

  const others = appModule[type].others.map((pg) => {
    const data = { ...input_data, page: pg.name };
    return {
      type: 'add',
      path: `../${destinationPath}/app/pages/{{snakeCase path}}/${path2gen}/{{snakeCase page}}.vue`,
      templateFile: `templates/module-${type}/${type}-page.vue.hbs`,
      data,
      skipIfExists: true,
    };
  });

  return basis.concat(others);
}
