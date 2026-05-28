import { defineField, defineType, defineArrayMember } from 'sanity'

const SPECIALIZATIONS = [
  { title: 'Závodní oddíl', value: 'zavodni-oddil' },
  { title: 'Přípravky', value: 'pripravky' },
  { title: 'Parkour', value: 'parkour' },
  { title: 'Tábory', value: 'tabory' },
  { title: 'Workshopy', value: 'workshopy' },
  { title: 'Oslavy', value: 'oslavy' },
  { title: 'Rodiče a děti', value: 'rodice-a-deti' },
]

export const trainerType = defineType({
  name: 'trainer',
  title: 'Trenér',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'specializations',
      title: 'Specializace',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: SPECIALIZATIONS },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
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
    select: { title: 'name', media: 'photo' },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})
