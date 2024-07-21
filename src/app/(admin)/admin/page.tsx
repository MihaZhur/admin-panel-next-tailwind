import { getUserSession } from '@/lib/get-user-session';

export default async function Admin() {
    const user = await getUserSession();
    const nameUser = user?.name ? user.name : 'Вы не авторизованы';
    return <>Добро пожаловать, {nameUser}!</>;
}
