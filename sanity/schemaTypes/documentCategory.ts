import { defineField, defineType } from 'sanity'

export const documentCategoryType = defineType({
  name: 'documentCategory',
  title: 'Dokumenty — kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název kategorie',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Sekce',
      type: 'string',
      options: {
        list: [
          { title: 'Trampolíny Liberec', value: 'liberec' },
          { title: 'Trampolíny Patrman', value: 'patrman' },
          { title: 'Trenéři', value: 'treneri' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
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
    select: { title: 'title', subtitle: 'brand' },
    prepare(selection: any) {
      const { title, subtitle } = selection
      const labels: Record<string, string> = {
        liberec: 'Trampolíny Liberec',
        patrman: 'Trampolíny Patrman',
        treneri: 'Trenéři',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle }
    },
  },
})
