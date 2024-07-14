import { SiteLayout } from '@/components/';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <SiteLayout>{children}</SiteLayout>;
}
