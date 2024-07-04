import { useRef, useEffect } from 'react';
import { FormState } from '@/utils/from-to-error-to-form-state';
import { useRouter } from 'next/navigation';

export const useFormReset = (formState: FormState, urlPushSuccess?: string) => {
    const formRef = useRef<HTMLFormElement>(null);
    const prevTimestamp = useRef(formState.timestamp);
    const router = useRouter();

    useEffect(() => {
        if (!formRef.current) return;
        if (formState.status === 'SUCCESS' && formState.timestamp !== prevTimestamp.current) {
            formRef.current.reset();

            prevTimestamp.current = formState.timestamp;
            if (urlPushSuccess) {
                router.push(urlPushSuccess);
                router.refresh();
            }
        }
    }, [formState.status, formState.timestamp, router, urlPushSuccess]);

    return formRef;
};
