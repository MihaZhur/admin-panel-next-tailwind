import { GoBack } from '@/components';
import { updatedPostAction } from './action';
import { FormPost } from '@/app/(admin)/admin/components';

export default async function EditPost({ params }: { params: { id: string } }) {
    const staticData = await fetch(`http://localhost:3000/api/posts/${params.id}`, { cache: 'no-store' });
    const data = await staticData.json();
    return (
        <>
            <GoBack />
            <FormPost
                action={updatedPostAction.bind(null, params.id)}
                initialValues={{ title: data.title, content: data.content, published: data.published }}
                btnText="Сохранить"
                btnTextLoading="Сохраняется"
                tostText="Пост успешно обновлен"
            />
        </>
    );
}
