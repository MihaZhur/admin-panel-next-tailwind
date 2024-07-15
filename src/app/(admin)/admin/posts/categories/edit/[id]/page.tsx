import { GoBack } from '@/components';
import { BodyPage, FormCategoryPost } from '../../../../components/';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
// import { creteCategoryPostAction } from './action';

export default async function EditCategory() {
    const session = await getServerSession(authConfig);
    return (
        <BodyPage>
            <GoBack />
            {/* <FormCategoryPost
                action={creteCategoryPostAction}
                btnText="Создать"
            /> */}
        </BodyPage>
    );
}
