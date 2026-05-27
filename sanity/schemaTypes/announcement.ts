import { defineField, defineType } from 'sanity'

export const announcementType = defineType({
  name: 'announcement',
  title: 'Aktualita',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'link',
      title: 'CTA tlačítko',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Popisek', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'expiresAt',
      title: 'Platná do',
      type: 'datetime',
      description: 'Nechte prázdné pro trvalé zobrazení.',
    }),
  ],
  preview: {
    select: { title: 'title', expiresAt: 'expiresAt' },
    prepare({ title, expiresAt }) {
      const exp = expiresAt ? `do ${new Date(expiresAt).toLocaleDateString('cs-CZ')}` : 'trvalá'
      return { title, subtitle: exp }
    },
  },
})
