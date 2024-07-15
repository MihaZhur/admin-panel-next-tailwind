import { GoBack } from '@/components';
import { updatedPostAction } from './action';
import { BodyPage, FormPost } from '@/app/(admin)/admin/components';
import { postService } from '@/services/post.service';
import { categoryPostService } from '@/services/category-post.service';

export default async function EditPost({ params }: { params: { id: string } }) {
    const { title, content, published, categories: categoriesPost } = await postService.getPostById(+params.id);
    const { categories } = await categoryPostService.getCategories({ currentPage: 1 });
    return (
        <BodyPage>
            <GoBack />
            <FormPost
                action={updatedPostAction.bind(null, params.id)}
                initialValues={{
                    title,
                    content: content ?? '',
                    published,
                    categories: categoriesPost,
                }}
                btnText="Сохранить"
                tostText="Пост успешно обновлен!"
                categories={categories}
            />
        </BodyPage>
    );
}
