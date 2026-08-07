import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { createClient } from '@/lib/supabase/client' // for real implementation

export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    if (currentPath.startsWith('/dashboard')) {
        // Mock Auth Check
        // For real Implementation we would read cookies and check with supabase.auth.getUser()
        const isAuthenticated = false; // Mocking false to test redirect or true to access. Let's say false without token.

        // We will allow access right now as development
        // if (!isAuthenticated) {
        //   return NextResponse.redirect(new URL('/login', request.url))
        // }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
}
