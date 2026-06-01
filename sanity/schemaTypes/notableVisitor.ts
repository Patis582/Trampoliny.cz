import { defineField, defineType } from 'sanity'

export const notableVisitorType = defineType({
  name: 'notableVisitor',
  title: 'Kdo nás navštívil',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno / Název',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotka / Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'photo' },
  },
})
