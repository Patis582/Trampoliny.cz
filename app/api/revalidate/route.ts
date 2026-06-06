import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('service', { expire: 0 })
  revalidateTag('event', { expire: 0 })
  revalidateTag('announcement', { expire: 0 })
  revalidateTag('gallery', { expire: 0 })
  revalidateTag('pricing', { expire: 0 })
  revalidateTag('trainer', { expire: 0 })
  revalidateTag('testimonial', { expire: 0 })
  revalidateTag('notableVisitor', { expire: 0 })
  revalidateTag('siteConfig', { expire: 0 })
  revalidateTag('documents', { expire: 0 })

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
