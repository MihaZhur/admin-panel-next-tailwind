import { HeaderSite } from '@/components/';
import { PropsWithChildren } from 'react';

export const SiteLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    return (
        <>
            <HeaderSite />
            <main className="main">
                <div className="bg-white overflow-hidden h-screen">{children}</div>
            </main>
        </>
    );
};
