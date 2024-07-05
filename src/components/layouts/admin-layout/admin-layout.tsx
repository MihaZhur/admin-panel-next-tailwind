import React, { PropsWithChildren } from 'react';
import { Sidebar } from '@/components';
import { Header } from '@/components';
export const AdmintLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={false} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={true} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
                </main>
            </div>
        </div>
    );
};
