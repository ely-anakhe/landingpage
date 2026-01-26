import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const STUDIO_ACCESS_KEY = process.env.STUDIO_ACCESS_KEY || 'anakhe-studio-2024'

export function middleware(request: NextRequest) {
    // Check if the request is for the studio
    if (request.nextUrl.pathname.startsWith('/studio')) {
        const accessKey = request.nextUrl.searchParams.get('access')

        // Check for access key in URL or cookie
        const hasValidAccess =
            accessKey === STUDIO_ACCESS_KEY ||
            request.cookies.get('studio_access')?.value === STUDIO_ACCESS_KEY

        if (!hasValidAccess) {
            // Redirect to home if no valid access
            return NextResponse.redirect(new URL('/', request.url))
        }

        // If access key is in URL, set a cookie so they don't need to keep using the URL param
        if (accessKey === STUDIO_ACCESS_KEY) {
            const response = NextResponse.next()
            response.cookies.set('studio_access', STUDIO_ACCESS_KEY, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/studio/:path*',
}
