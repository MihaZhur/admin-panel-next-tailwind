import { GoBack } from '@/components';
import { updatedPostAction } from './action';
import { BodyPage, FormPost } from '@/components/admin';
import { postService } from '@/services/post.service';
import { categoryPostService } from '@/services/category-post.service';
import { notFound } from 'next/navigation';

export default async function EditPost({ params }: { params: { id: string } }) {
    if (Number.isNaN(+params.id)) {
        notFound();
    }
    const {
        title,
        content,
        published,
        categories: categoriesPost,
        preview,
    } = await postService.getPostById(+params.id);

    const categories = await categoryPostService.getAllCategories();
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
                    preview,
                }}
                btnText="Сохранить"
                tostText="Пост успешно обновлен!"
                categories={categories}
            />
        </BodyPage>
    );
}
