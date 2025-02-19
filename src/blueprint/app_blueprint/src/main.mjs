import {
  choices as specChoices,
  data as _data,
  appPlatformBuilder,
} from './dataspace.mjs';

const { defineAppModules, defineSteps } = appPlatformBuilder;

export const choices = specChoices;
export const data = {
  category: _data.category,
  product: _data.product,
  order: _data.order,
};

const steps = defineSteps({
  rootconfirm: {
    root: 'Information',
    confirm: 'Confirmation',
  },
  editconfirm: ['edit', 'confirm'],
});

export const appModules = defineAppModules({
  category: {
    label: 'Category',
    list: {
      root: data.category,
      closed: data.category,
    },
    create: {
      root: {
        entity: data.category,
        post: true,
        role: 'stepedit',
        steps: steps.rootconfirm,
      },
      confirm: {
        entity: data.category,
        post: true,
        role: 'stepconfirm',
        steps: steps.rootconfirm,
      },
    },
    each: {
      root: {
        entity: data.category,
        actions: ['Edit'],
      },
      edit: {
        entity: data.category,
        post: true,
        role: 'edit',
      },
      close: {
        entity: data.category,
        role: 'confirm',
      },
    },
  },

  products: {
    label: 'Products',
    list: {
      root: data.product,
      closed: data.product,
    },
    create: {
      root: {
        entity: data.product,
        post: true,
      },
    },
    each: {
      root: {
        entity: data.product,
        actions: [
          'Code',
          {
            label: 'Edit',
            to: { page: 'edit' },
          },
        ],
      },
      edit: {
        entity: data.product,
        post: true,
        role: 'edit',
      },
      code: {
        entity: data.product,
        subName: 'code',
      },
      close: {
        entity: data.product,
        role: 'confirm',
      },
    },
  },

  posts: {
    label: 'Category',
    dataPath: 'category',
    icon: 'i-heroicons-arrow-right-circle',
    list: {
      root: data.category,
      closed: data.category,
    },
    create: {
      root: {
        entity: data.category,
        post: '..',
        role: 'stepedit',
      },
      confirm: {
        entity: data.category,
        post: true,
        role: 'stepconfirm',
      },
      steps: {
        entity: data.category,
        role: 'steps',
      },
    },
    each: {
      root: data.category,
      edit: {
        entity: data.category,
        post: '..',
        get: '..',
        role: 'edit',
      },
      close: {
        entity: data.category,
        role: 'confirm',
      },
    },
  },
});
