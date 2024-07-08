import React, { PropsWithChildren } from 'react';
import { GoBack, Sidebar } from '@/components';
import { Header } from '@/components';
export const AdmintLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={false} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={true} />
                <main className="dark:bg-slate-700">
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
                </main>
            </div>
        </div>
    );
};
