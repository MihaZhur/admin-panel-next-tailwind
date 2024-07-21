import { GoBack } from '@/components';
import { BodyPage, FormPost } from '@/components';
import { cretePostAction } from './action';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { categoryPostService } from '@/services/category-post.service';

export default async function Create() {
    const session = await getServerSession(authConfig);
    const { categories } = await categoryPostService.getCategories({ currentPage: 1 });
    return (
        <BodyPage>
            <GoBack />
            <FormPost
                categories={categories}
                action={cretePostAction.bind(null, String(session?.user?.id))}
                btnText="Создать"
            />
        </BodyPage>
    );
}
