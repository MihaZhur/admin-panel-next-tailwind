import type { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
const admin = {
    id: '1',
    email: 'test@mail.ru',
    name: 'Михаил',
    password: '1q2w3e4r',
    role: 'ADMIN',
};
export const authConfig: AuthOptions = {
    session: {
        strategy: 'jwt',
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
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                // Add logic here to look up the user from the credentials supplied

                if (admin.password === credentials.password && credentials.email === admin.email) {
                    // Any object returned will be saved in `user` property of the JWT
                    const { id, email, name, role } = admin;

                    return {
                        id,
                        email,
                        name,
                        role,
                    } as User;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
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
