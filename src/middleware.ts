export { default } from 'next-auth/middleware';

import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { User } from '@prisma/client';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const user: User | null = token as User;

    if (user && user.role !== 'ADMIN' && user.role !== 'MANAGER') {
        return NextResponse.redirect(new URL('/signin?error=Please login first to access this route', request.url));
    }
}

export const config = { matcher: ['/admin/:path*', '/admin'] };
