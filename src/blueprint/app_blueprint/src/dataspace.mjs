import { createBigDataDefinitionBuilder } from '@finsoft/blueprint';
import * as v from 'valibot';

export const appPlatformBuilder = createBigDataDefinitionBuilder('sample');
const { defineEntities, defineChoices, defineLinkChoices } = appPlatformBuilder;

export const choices = defineChoices({
  categoryStates: {
    prep: 'Preparation',
    active: 'Active',
    inactive: 'Inactive',
  },
});

export const data = defineEntities({
  category: {
    root: [
      {
        model: 'name',
        label: 'Name',
        spec: v.pipe(v.string(), v.nonEmpty(), v.maxLength(15)),
        component: 'text',
      },
      {
        model: 'createdAt',
        label: 'Date Created',
        spec: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^\d{8}$/, "Invalid format, date should be 'YYYYMMDD'")
          )
        ),
        // spec: v.union([v.optional(v.date()), v.pipe(v.string(), v.transform(dt => new Date(dt)), v.date())]),
        component: 'date',
      },
      {
        model: 'state',
        label: 'State',
        spec: v.pipe(v.string(), v.nonEmpty()),
        component: 'select',
        choices: choices.categoryStates,
      },
    ],
    links: [
      {
        name: 'products',
        component: 'list',
        // link2: '/api/fin-app/products',
        link2: 'products',
        dataLabel: (data) => `${data.name}`,
        query: {
          look4: 'categoryId',
        },
      },
    ],
  },

  product: {
    root: [
      {
        model: 'name',
        label: 'Name',
        spec: {},
        component: 'text',
      },
      {
        model: 'price',
        label: 'Price',
        spec: {},
        component: 'number',
      },
      {
        model: 'description',
        label: 'Description',
        spec: {},
        component: 'text',
      },
      {
        model: 'categoryId',
        label: 'Category',
        spec: {},
        component: 'link2select',
        link: {
          name: 'category',
          component: 'appendable',
          link2: 'category', // { module: 'category', realm: 'list', page: 'root' },
          dataLabel: (data) => `${data.name} (${data.state})`,
          query: (search) => ({ q: search }), // (search) => ({ name: search })
        },
      },
    ],
    sub: [
      {
        name: 'code',
        component: 'entry',
        fields: [
          {
            model: 'qrCode',
            label: 'QR Code',
            spec: {},
            component: 'text',
          },
          {
            model: 'upcCode',
            label: 'UPC Code',
            spec: {},
            component: 'text',
          },
        ],
      },
    ],
  },

  order: {
    root: [
      {
        model: 'customer',
        label: 'Customer Name',
        spec: {},
        component: 'text',
      },
      {
        model: 'orderDate',
        label: 'Order Date',
        spec: {},
        component: 'date',
      },
    ],
    sub: [
      {
        name: 'orderItems',
        component: 'list',
        fields: [
          {
            model: 'productId',
            label: 'Product',
            spec: {},
            component: 'product',
            choices: 'ref:products',
          },
          {
            model: 'quantity',
            label: 'Quantity',
            spec: {},
            component: 'number',
          },
          {
            model: 'unitPrice',
            label: 'Unit Price',
            spec: {},
            component: 'number',
          },
        ],
      },
    ],
  },
});
