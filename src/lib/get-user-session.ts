import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';

export const getUserSession = async () => {
    const session = await getServerSession(authConfig);
    return session?.user ?? null;
};
