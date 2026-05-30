// sanity/schemaTypes/siteConfig.ts
import { defineField, defineType } from 'sanity'

export const siteConfigType = defineType({
  name: 'siteConfig',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'eosLoginUrl',
      title: 'EOS — přihlašovací odkaz',
      type: 'url',
      description: 'Odkaz na přihlášení do EOS systému (zobrazuje se na stránce Jak na to)',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nastavení webu' }
    },
  },
})
