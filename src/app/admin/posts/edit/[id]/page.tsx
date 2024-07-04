import { updatedPostAction } from './action';
import { FormPost } from '@/app/admin/components';

export default async function EditPost({ params }: { params: { id: string } }) {
    const staticData = await fetch(`http://localhost:3000/api/posts/${params.id}`, { cache: 'no-store' });
    const data = await staticData.json();
    return (
        <FormPost
            action={updatedPostAction.bind(null, params.id)}
            initialValues={{ title: data.title }}
        />
    );
}
