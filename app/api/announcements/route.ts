import { NextResponse } from 'next/server'
import { getAnnouncements } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const announcements = await getAnnouncements()
  return NextResponse.json(announcements)
}
