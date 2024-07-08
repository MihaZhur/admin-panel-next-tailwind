import React, { PropsWithChildren } from 'react';
import { Sidebar } from '@/components';
import { Header } from '@/components';

export const AdmintLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden dark:bg-slate-700">
            <Sidebar sidebarOpen={false} />
            <div className="relative flex flex-1 flex-col h-full min-h-full overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={true} />
                <main className="">
                    <div className="mx-auto min-h-full h-full  p-4 md:p-6 2xl:p-10">{children}</div>
                </main>
            </div>
        </div>
    );
};
