import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('service', 'max')
  revalidateTag('event', 'max')
  revalidateTag('announcement', 'max')
  revalidateTag('gallery', 'max')
  revalidateTag('pricing', 'max')
  revalidateTag('trainer', 'max')
  revalidateTag('testimonial', 'max')
  revalidateTag('notableVisitor', 'max')
  revalidateTag('siteConfig', 'max')
  revalidateTag('documents', 'max')

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
