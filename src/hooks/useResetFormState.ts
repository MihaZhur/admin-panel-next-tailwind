import { useRef, useEffect } from 'react';
import { FormState } from '@/utils/from-to-error-to-form-state';
import { useRouter } from 'next/navigation';

export const useFormReset = (formState: FormState, urlPushSuccess?: string, resetForm?: boolean) => {
    const formRef = useRef<HTMLFormElement>(null);
    const prevTimestamp = useRef(formState.timestamp);
    const router = useRouter();

    useEffect(() => {
        if (!formRef.current) return;
        if (formState.status === 'SUCCESS' && formState.timestamp !== prevTimestamp.current) {
            if (urlPushSuccess) {
                router.push(urlPushSuccess);
                router.refresh();
            }
            if (resetForm) {
                formRef.current.reset();
                prevTimestamp.current = formState.timestamp;
            }
        }
    }, [formState.status, formState.timestamp, resetForm, router, urlPushSuccess]);

    return formRef;
};
