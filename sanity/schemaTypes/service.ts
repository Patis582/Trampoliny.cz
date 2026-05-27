import { defineField, defineType, defineArrayMember } from 'sanity'

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
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis (karta)',
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
      title: 'Fotka (karta)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Fotka (detail — hero)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ageGroup',
      title: 'Věková skupina',
      type: 'string',
      placeholder: 'např. Od 8 let',
    }),
    defineField({
      name: 'locationFull',
      title: 'Lokalita (celá)',
      type: 'string',
      placeholder: 'např. TC Orionka, Liberec – Harcov',
    }),
    defineField({
      name: 'bodyTitle',
      title: 'Nadpis nad obsahem',
      type: 'string',
      placeholder: 'např. Pro koho jsou tréninky určeny',
    }),
    defineField({
      name: 'body',
      title: 'Obsah stránky',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'Jak to funguje (body)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'pricingNote',
      title: 'Poznámka k ceníku',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'files',
      title: 'Soubory ke stažení',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Popisek', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'file', title: 'Soubor (PDF)', type: 'file', validation: (r) => r.required() }),
            defineField({
              name: 'style',
              title: 'Styl',
              type: 'string',
              options: { list: [{ title: 'Primární', value: 'primary' }, { title: 'Outline', value: 'outline' }] },
              initialValue: 'outline',
            }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'registration',
      title: 'Registrace / kontakt',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Typ',
          type: 'string',
          options: {
            list: [
              { title: 'EOS systém (závodní oddíl)', value: 'eos' },
              { title: 'Email (oslavy, pronájem)', value: 'email' },
              { title: 'Google Form (tábory, workshopy)', value: 'form' },
            ],
            layout: 'radio',
          },
        }),
        defineField({ name: 'email', title: 'Kontaktní email', type: 'string' }),
        defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
        defineField({ name: 'formUrl', title: 'URL Google Form', type: 'url' }),
        defineField({ name: 'ctaDescription', title: 'Text pod "Ozvi se nám"', type: 'text', rows: 3 }),
      ],
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
