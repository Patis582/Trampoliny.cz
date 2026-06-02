import { defineField, defineType } from 'sanity'

export const downloadableDocumentType = defineType({
  name: 'downloadableDocument',
  title: 'Dokumenty — soubor',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název dokumentu',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'file',
      title: 'Soubor (PDF, DOCX…)',
      type: 'file',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'documentCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí v kategorii',
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
    select: { title: 'title', subtitle: 'category.title' },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return { title, subtitle: subtitle ?? '' }
    },
  },
})
