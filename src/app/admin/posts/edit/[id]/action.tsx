'use server';
import { z } from 'zod';
import { FormState, fromErrorToFormState } from '@/utils/from-to-error-to-form-state';
import { toFormState } from '@/utils/to-from-state';

export const updatedPostAction = async (id: string, formState: FormState, formData: FormData) => {
    try {
        const postSchema = z.object({
            title: z.string().min(6),
        });
        const data = {
            title: formData.get('title'),
        };
        const validatedFields = postSchema.parse({ ...data });

        console.log(data);

        await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ ...validatedFields }),
        });
        return toFormState('SUCCESS', 'Post updated');
    } catch (error) {
        return fromErrorToFormState(error);
    }
};
