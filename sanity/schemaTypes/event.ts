import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Akce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum začátku',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Datum konce (u vícedenních akcí)',
      type: 'datetime',
    }),
    defineField({
      name: 'type',
      title: 'Typ akce',
      type: 'string',
      options: {
        list: [
          { title: 'Závod', value: 'závod' },
          { title: 'Tábor', value: 'tábor' },
          { title: 'Kemp', value: 'kemp' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Jiné', value: 'jiné' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'customType',
      title: 'Název vlastního typu',
      type: 'string',
      description: 'Napiš vlastní typ akce (zobrazí se místo štítku)',
      hidden: ({ document }) => document?.type !== 'jiné',
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'registration',
      title: 'Přihláška',
      type: 'object',
      fields: [
        defineField({ name: 'url', title: 'URL přihlášky', type: 'url' }),
        defineField({ name: 'isOpen', title: 'Přihlášky otevřeny', type: 'boolean', initialValue: false }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Doplňkové odkazy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Popisek', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', date: 'date', type: 'type', media: 'image' },
    prepare({ title, date, type, media }) {
      const d = date ? new Date(date).toLocaleDateString('cs-CZ') : ''
      return { title, subtitle: `${d} · ${type ?? ''}`, media }
    },
  },
})
