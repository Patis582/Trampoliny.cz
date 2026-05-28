import { defineField, defineType, defineArrayMember } from 'sanity'

export const pricingSectionType = defineType({
  name: 'pricingSection',
  title: 'Ceník — sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název sekce',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: 'validFrom',
      title: 'Platnost od',
      type: 'string',
      placeholder: 'např. od 1.8.2025',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF ke stažení',
      type: 'file',
    }),
    defineField({
      name: 'pdfLabel',
      title: 'Popisek tlačítka PDF',
      type: 'string',
      initialValue: 'Stáhnout ceník PDF',
    }),
    defineField({
      name: 'note',
      title: 'Poznámka pod sekcí',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'groups',
      title: 'Skupiny cen',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingGroup',
          title: 'Skupina cen',
          fields: [
            defineField({
              name: 'title',
              title: 'Název skupiny',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({ name: 'subtitle', title: 'Podtitulek', type: 'string' }),
            defineField({
              name: 'columnHeaders',
              title: 'Záhlaví sloupců',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'rows',
              title: 'Řádky cen',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'pricingRow',
                  title: 'Řádek',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Popis',
                      type: 'string',
                      validation: (r) => r.required(),
                    }),
                    defineField({ name: 'note', title: 'Poznámka', type: 'string' }),
                    defineField({
                      name: 'highlight',
                      title: 'Zvýraznit řádek',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'values',
                      title: 'Hodnoty (ceny)',
                      type: 'array',
                      of: [defineArrayMember({ type: 'string' })],
                    }),
                  ],
                  preview: { select: { title: 'label' } },
                }),
              ],
            }),
            defineField({
              name: 'infoBlock',
              title: 'Info text (místo tabulky)',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
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
    select: { title: 'title', subtitle: 'validFrom' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ?? '' }
    },
  },
})
