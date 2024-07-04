'use client';
import { ButtonSubmit, FieldError } from '@/app/admin/components/';

import { useFormState } from 'react-dom';
import { EMPTY_FORM_STATE } from '@/utils/from-to-error-to-form-state';
import { useFormReset } from '@/hooks/useResetFormState';
import React, { useEffect } from 'react';

interface Props {
    action: any;
    initialValues?: {
        title: string;
    };
}
export const FormPost: React.FC<Props> = ({ action: actionFn, initialValues }) => {
    const [formState, action] = useFormState(actionFn, EMPTY_FORM_STATE);
    const formRef = useFormReset(formState, '/admin/posts');

    useEffect(() => {
        if (formRef.current && initialValues) {
            const keys = Object.keys(initialValues);
            keys.forEach((key) => {
                const field = formRef.current?.[key] as HTMLInputElement | HTMLTextAreaElement;
                const keyFileld = key as keyof Props['initialValues'];

                field.value = initialValues[keyFileld];
            });
        }
    }, [formRef, initialValues]);
    return (
        <>
            <form
                ref={formRef}
                className=" mx-auto"
                action={action}
            >
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <textarea
                    name="title"
                    id="title"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
                <FieldError
                    formState={formState}
                    name="title"
                />
                <ButtonSubmit
                    label="Создать"
                    loading="Создается запись..."
                />
            </form>
        </>
    );
};
