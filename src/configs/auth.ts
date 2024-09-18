import prisma from '@/lib/db';
import { compare } from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const MESSAGE_ERROR_VALIDATE_USER = 'Неверно набран email или пароль';

const MESSAGE_ERROR_ACTIVATION_USER = 'Ваш аккаунт еще не активирован';

export const authConfig: AuthOptions = {
    session: {
        strategy: 'jwt',
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
    },
    providers: [
        Credentials({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.

            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email',
                    requered: true,
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'password',
                    requered: true,
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error(MESSAGE_ERROR_VALIDATE_USER);
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error(MESSAGE_ERROR_VALIDATE_USER);
                }

                const isPasswordValid = await compare(credentials.password, String(user.password));

                if (!isPasswordValid) {
                    throw new Error(MESSAGE_ERROR_VALIDATE_USER);
                }

                if (!user.activated) {
                    throw new Error(MESSAGE_ERROR_ACTIVATION_USER);
                }

                return {
                    id: user.id + '',
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    pages: {
        signIn: '/signin/',
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    role: u.role,
                };
            }
            return token;
        },
    },
};
