import { AdmintLayout } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Админ панель',
    description: 'Админ панель некст js',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdmintLayout>{children}</AdmintLayout>;
}
