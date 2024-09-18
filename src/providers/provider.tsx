'use client';

import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './query-client';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <SessionProvider>
            <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
    );
};
