import { defineField, defineType } from 'sanity'

export const liberecConfigType = defineType({
  name: 'liberecConfig',
  title: 'Trampolíny Liberec',
  type: 'document',
  fields: [
    defineField({
      name: 'rozvrh',
      title: 'Rozvrh tréninků (PDF)',
      type: 'file',
      description: 'Zobrazí se jako tlačítko pod aktivitami na stránce Trampolíny Liberec.',
    }),
    defineField({
      name: 'rozvrhLabel',
      title: 'Popisek tlačítka rozvrhu',
      type: 'string',
      initialValue: 'Rozvrh tréninků PDF',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trampolíny Liberec' }
    },
  },
})
