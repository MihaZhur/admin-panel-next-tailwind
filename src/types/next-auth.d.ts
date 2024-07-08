import { Role } from '@prisma/client';
import NextAuth from 'next-auth';

interface UserDataSession {
    name: string;
    role: Role;
    id: number;
    email: string;
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserDataSession;
    }
}
