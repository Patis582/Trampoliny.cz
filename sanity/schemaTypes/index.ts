import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType],
}
