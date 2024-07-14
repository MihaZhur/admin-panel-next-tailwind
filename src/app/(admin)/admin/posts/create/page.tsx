import { GoBack } from '@/components';
import { FormPost } from '../../components';
import { cretePostAction } from './action';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';

export default async function Create() {
    const session = await getServerSession(authConfig);
    return (
        <>
            <GoBack />
            <FormPost
                action={cretePostAction.bind(null, String(session?.user?.id))}
                btnText="Создать"
                btnTextLoading="Создается"
            />
        </>
    );
}
