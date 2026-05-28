import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType, trainerType, pricingSectionType],
}
