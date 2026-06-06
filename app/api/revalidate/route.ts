import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('service')
  revalidateTag('event')
  revalidateTag('announcement')
  revalidateTag('gallery')
  revalidateTag('pricing')
  revalidateTag('trainer')
  revalidateTag('testimonial')
  revalidateTag('notableVisitor')
  revalidateTag('siteConfig')
  revalidateTag('documents')

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
