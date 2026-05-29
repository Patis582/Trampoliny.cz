import { defineField, defineType } from 'sanity'

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Galerie — Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název alba',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Titulní fotka',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Fotky',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: false } }],
      description: 'Vyber více fotek najednou pro hromadné nahrání.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'event',
      title: 'Propojená akce (volitelné)',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Napoj album na akci z kalendáře.',
    }),
  ],
  preview: {
    select: { title: 'title', date: 'date', media: 'coverImage' },
    prepare({ title, date, media }) {
      const d = date ? new Date(date).toLocaleDateString('cs-CZ') : ''
      return { title, subtitle: d, media }
    },
  },
})
