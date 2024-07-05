import { AdmintLayout } from '@/components';
import type { Metadata } from 'next';
import { ToastProvider } from '@/app/admin/components/toasty';
export const metadata: Metadata = {
    title: 'Админ панель',
    description: 'Админ панель некст js',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <AdmintLayout>{children}</AdmintLayout>
        </ToastProvider>
    );
}
