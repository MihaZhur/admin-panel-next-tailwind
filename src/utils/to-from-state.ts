import { redirect } from 'next/navigation';
import { FormState } from './from-to-error-to-form-state';

export const toFormState = (status: FormState['status'], message: string): FormState => {
    return {
        status,
        message,
        fieldErrors: {},
        timestamp: Date.now(),
    };
};
