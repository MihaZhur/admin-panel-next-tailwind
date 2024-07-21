import { GoBack } from '@/components';
import { BodyPage, FormCategoryPost } from '../../../../../../components/admin';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { createCategoryPostAction } from './action';

export default async function CreateCategory() {
    const session = await getServerSession(authConfig);
    return (
        <BodyPage>
            <GoBack />
            <FormCategoryPost
                action={createCategoryPostAction}
                btnText="Создать"
            />
        </BodyPage>
    );
}
