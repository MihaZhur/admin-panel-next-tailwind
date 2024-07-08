// / Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);

        if (request.nextUrl.pathname.startsWith('/admin') && request.nextauth.token?.role === 'USER') {
            return NextResponse.rewrite(new URL('/profile', request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
);

export const config = { matcher: ['/admin/:path*', '/admin'] };
