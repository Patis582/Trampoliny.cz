import { client } from './client'

export type Service = {
  _id: string
  title: string
  slug: string
  description: string
  brand: 'liberec' | 'patrman'
  accent: 'orange' | 'green' | 'navy'
  order: number
  image?: { url: string; alt?: string }
}

export type ServiceDetail = Service & {
  heroImage?: { url: string; alt?: string }
  ageGroup?: string
  locationFull?: string
  bodyTitle?: string
  body?: import('@portabletext/types').PortableTextBlock[]
  howItWorks?: string[]
  pricingNote?: string
  files?: { label: string; fileUrl: string; style: 'primary' | 'outline' }[]
  registration?: {
    type: 'eos' | 'email' | 'form'
    email?: string
    phone?: string
    formUrl?: string
    ctaDescription?: string
  }
}

export type Announcement = {
  _id: string
  title: string
  body?: { _type: string; children: { text: string }[] }[]
  link?: { label: string; url: string }
  expiresAt?: string
}

export type EventType = 'závod' | 'tábor' | 'kemp' | 'workshop' | 'jiné'

export type Event = {
  _id: string
  slug: string
  title: string
  date: string
  endDate?: string
  type: EventType
  customType?: string
  description?: import('@portabletext/types').PortableTextBlock[]
  image?: { asset: { _ref: string; _type: 'reference' }; hotspot?: { x: number; y: number } }
  links?: { label: string; url: string }[]
  registration?: {
    url?: string
    isOpen: boolean
  }
}

const serviceFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  brand,
  accent,
  order,
  "image": image { "url": asset->url, "alt": alt }
`

const serviceDetailFields = `
  ${serviceFields},
  "heroImage": heroImage { "url": asset->url, "alt": alt },
  ageGroup,
  locationFull,
  bodyTitle,
  body,
  howItWorks,
  pricingNote,
  "files": files[] { label, "fileUrl": file.asset->url, style },
  registration
`

const announcementFields = `
  _id,
  title,
  body,
  link,
  expiresAt
`

const eventFields = `
  _id, "slug": slug.current, title, date, endDate, type, customType, description,
  image { asset, hotspot },
  links[] { label, url },
  registration { url, isOpen }
`

export async function getServices(): Promise<Service[] | null> {
  try {
    return await client.fetch(
      `*[_type == "service"] | order(order asc) { ${serviceFields} }`,
      {},
      { next: { tags: ['service'] } }
    )
  } catch {
    return null
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    return await client.fetch(
      `*[_type == "service" && slug.current == $slug][0] { ${serviceDetailFields} }`,
      { slug },
      { next: { tags: ['service'] } }
    )
  } catch {
    return null
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const results: { slug: string }[] = await client.fetch(
      `*[_type == "service" && defined(slug.current)] { "slug": slug.current }`,
      {},
      { next: { tags: ['service'] } }
    )
    return results.map((r) => r.slug)
  } catch {
    return []
  }
}

export async function getServicesByBrand(brand: 'liberec' | 'patrman'): Promise<Service[] | null> {
  try {
    return await client.fetch(
      `*[_type == "service" && brand == $brand] | order(order asc) { ${serviceFields} }`,
      { brand },
      { next: { tags: ['service'] } }
    )
  } catch {
    return null
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const today = new Date().toISOString()
    return await client.fetch(
      `*[_type == "announcement" && (!defined(expiresAt) || expiresAt >= $today)] | order(_createdAt desc) { ${announcementFields} }`,
      { today },
      { next: { tags: ['announcement'] } }
    )
  } catch {
    return []
  }
}

export async function getUpcomingEvents(limit?: number): Promise<Event[] | null> {
  try {
    const today = new Date().toISOString()
    const slice = limit ? `[0...${limit}]` : ''
    return await client.fetch(
      `*[_type == "event" && date >= $today] | order(date asc) ${slice} { ${eventFields} }`,
      { today },
      { next: { tags: ['event'] } }
    )
  } catch {
    return null
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  try {
    const results: { slug: string }[] = await client.fetch(
      `*[_type == "event" && defined(slug.current)] { "slug": slug.current }`,
      {},
      { next: { tags: ['event'] } }
    )
    return results.map((r) => r.slug)
  } catch {
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    return await client.fetch(
      `*[_type == "event" && slug.current == $slug][0] { ${eventFields} }`,
      { slug },
      { next: { tags: ['event'] } }
    )
  } catch {
    return null
  }
}

export type Trainer = {
  _id: string
  name: string
  slug: string
  photo?: { url: string; alt?: string; hotspot?: { x: number; y: number } }
  bio: string
  specializations: string[]
  email?: string
  phone?: string
  order: number
}

export async function getTrainers(): Promise<Trainer[] | null> {
  try {
    return await client.fetch(
      `*[_type == "trainer"] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        "photo": photo { "url": asset->url, "alt": alt, "hotspot": hotspot },
        bio,
        specializations,
        email,
        phone,
        order
      }`,
      {},
      { next: { tags: ['trainer'] } }
    )
  } catch {
    return null
  }
}

export type PricingRow = {
  _key: string
  label: string
  note?: string
  highlight?: boolean
  values: string[]
}

export type PricingGroup = {
  _key: string
  title: string
  subtitle?: string
  columnHeaders: string[]
  rows?: PricingRow[]
  infoBlock?: string
}

export type PricingSection = {
  _id: string
  title: string
  slug: string
  validFrom?: string
  pdfUrl?: string
  pdfLabel?: string
  note?: string
  groups: PricingGroup[]
  order: number
}

export async function getPricingSections(): Promise<PricingSection[] | null> {
  try {
    return await client.fetch(
      `*[_type == "pricingSection"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        validFrom,
        "pdfUrl": pdf.asset->url,
        pdfLabel,
        note,
        groups[] {
          _key,
          title,
          subtitle,
          columnHeaders,
          rows[] {
            _key,
            label,
            note,
            highlight,
            values
          },
          infoBlock
        },
        order
      }`,
      {},
      { next: { tags: ['pricing'] } }
    )
  } catch {
    return null
  }
}
