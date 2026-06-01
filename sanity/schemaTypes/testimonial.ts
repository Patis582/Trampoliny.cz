import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Recenze',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Jméno',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Hodnocení (1–5)',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Text recenze',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'text' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 80) }
    },
  },
})
