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

export async function getServices(): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc) { ${serviceFields} }`,
    {},
    { next: { tags: ['service'] } }
  )
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] { ${serviceDetailFields} }`,
    { slug },
    { next: { tags: ['service'] } }
  )
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "service" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { next: { tags: ['service'] } }
  )
  return results.map((r) => r.slug)
}

export async function getServicesByBrand(brand: 'liberec' | 'patrman'): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service" && brand == $brand] | order(order asc) { ${serviceFields} }`,
    { brand },
    { next: { tags: ['service'] } }
  )
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const today = new Date().toISOString()
  return client.fetch(
    `*[_type == "announcement" && (!defined(expiresAt) || expiresAt >= $today)] | order(_createdAt desc) { ${announcementFields} }`,
    { today },
    { next: { tags: ['announcement'] } }
  )
}
