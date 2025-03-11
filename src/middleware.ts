import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { NOT_PAGES_LIST } from './constants/common'
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname, origin } = new URL(req.url)
  const isNotPage = NOT_PAGES_LIST.filter(startUrl => pathname.startsWith(startUrl))

  if (isNotPage.length > 0) {
    return
  }
}
