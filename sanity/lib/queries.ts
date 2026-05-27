import { client } from './client'

export type Service = {
  _id: string
  title: string
  description: string
  brand: 'liberec' | 'patrman'
  accent: 'orange' | 'green' | 'navy'
  order: number
  image?: { url: string; alt?: string }
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
  description,
  brand,
  accent,
  order,
  "image": image { "url": asset->url, "alt": alt }
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

export async function getAnnouncements(): Promise<Announcement[]> {
  const today = new Date().toISOString()
  return client.fetch(
    `*[_type == "announcement" && (!defined(expiresAt) || expiresAt >= $today)] | order(_createdAt desc) { ${announcementFields} }`,
    { today },
    { next: { tags: ['announcement'] } }
  )
}
