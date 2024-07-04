import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth/next';
export default async function Admin() {
    const session = await getServerSession(authConfig);
    const nameUser = session?.user ? session?.user.name : 'Вы не авторизованы';
    return <>Добро пожаловать, {nameUser}!</>;
}
