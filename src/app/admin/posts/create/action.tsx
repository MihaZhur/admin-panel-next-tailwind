'use server';
import { z } from 'zod';
import { FormState, fromErrorToFormState } from '@/utils/from-to-error-to-form-state';
import { toFormState } from '@/utils/to-from-state';

export const cretePostAction = async (formState: FormState) => {
    try {
        await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ ...formState }),
        });
        return toFormState('SUCCESS', 'Message created');
    } catch (error) {
        return fromErrorToFormState(error);
    }
};
