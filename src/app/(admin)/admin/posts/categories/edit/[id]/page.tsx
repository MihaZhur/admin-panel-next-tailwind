import { GoBack } from '@/components';
import { BodyPage, FormCategoryPost } from '../../../../../../../components/admin';
import { updateCategoryPostAction } from './action';
import { categoryPostService } from '@/services/category-post.service';

export default async function EditCategory({ params }: { params: { id: string } }) {
    const category = await categoryPostService.getCategoryById(+params.id);
    return (
        <BodyPage>
            <GoBack />
            <FormCategoryPost
                action={updateCategoryPostAction.bind(null, category.id)}
                btnText="Сохранить"
                initialValues={category}
            />
        </BodyPage>
    );
}
