'use server';
import { z } from 'zod';
import { FormState, fromErrorToFormState } from '../../../../utils/from-to-error-to-form-state';
import { toFormState } from '@/utils/to-from-state';

export const cretePostAction = async (formState: FormState, formData: FormData) => {
    try {
        const postSchema = z.object({
            title: z.string().min(6),
        });
        const data = {
            title: formData.get('title'),
        };
        const validatedFields = postSchema.parse({ ...data });

        await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ ...validatedFields }),
        });
        return toFormState('SUCCESS', 'Message created');
    } catch (error) {
        return fromErrorToFormState(error);
    }
};
