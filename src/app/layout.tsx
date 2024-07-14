import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/provider';
import { NextNProgressClient } from '@/components';
import { NextUIProvider } from '@nextui-org/system';
import { ToastProvider } from './admin/components/toasty/toast-provider';
export const metadata: Metadata = {
    title: 'Шаблон админки Nextjs Prisma',
    description:
        'Пет проект - административаня панель для блока. Стек технологий: nextjs, prisma orm, tailwind css, nextui',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>
                <NextNProgressClient />
                <Providers>
                    <NextUIProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </NextUIProvider>
                </Providers>
            </body>
        </html>
    );
}
