import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Značka',
      type: 'string',
      options: {
        list: [
          { title: 'Trampolíny Liberec', value: 'liberec' },
          { title: 'Trampolíny Patrman', value: 'patrman' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Barva',
      type: 'string',
      options: {
        list: [
          { title: 'Oranžová', value: 'orange' },
          { title: 'Zelená', value: 'green' },
          { title: 'Navy', value: 'navy' },
        ],
        layout: 'radio',
      },
      initialValue: 'orange',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand', media: 'image' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'liberec' ? 'Trampolíny Liberec' : 'Trampolíny Patrman',
        media,
      }
    },
  },
})
