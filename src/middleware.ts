import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication
const protectedPaths = ['/dashboard', '/editor']

// Add paths that require admin role
const adminPaths = ['/admin']

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
  const isAdminPath = adminPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !currentUser) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isAdminPath) {
    if (!currentUser) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    try {
      const user = JSON.parse(currentUser.value)
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/admin/:path*'],
} 