import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'
import { galleryAlbumType } from './galleryAlbum'
import { siteConfigType } from './siteConfig'
import { testimonialType } from './testimonial'
import { notableVisitorType } from './notableVisitor'
import { documentCategoryType } from './documentCategory'
import { downloadableDocumentType } from './downloadableDocument'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    serviceType,
    eventType,
    announcementType,
    trainerType,
    pricingSectionType,
    galleryAlbumType,
    siteConfigType,
    testimonialType,
    notableVisitorType,
    documentCategoryType,
    downloadableDocumentType,
  ],
}
