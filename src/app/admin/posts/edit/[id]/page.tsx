'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetPost } from '@/hooks/useGetPost';
import { useFormState } from 'react-dom';
import { updatedPostAction } from './action';
import { useFormReset } from '@/hooks/useResetFormState';
import { ButtonSubmit, FieldError } from '@/app/admin/components';
import { EMPTY_FORM_STATE } from '@/utils/from-to-error-to-form-state';

export default function EditPost() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetPost(id);
    const [formState, action] = useFormState(updatedPostAction.bind(null, id), EMPTY_FORM_STATE);
    const formRef = useFormReset(formState, '/admin/posts');

    useEffect(() => {
        if (formRef.current && data) {
            const titleField = formRef.current.title as unknown as HTMLTextAreaElement;
            titleField.value = data.title;
        }
    }, [data, formRef]);

    return (
        <>
            <>{isLoading && 'Загрузка поста...'}</>
            <form
                className=" mx-auto"
                method="POST"
                action={action}
                ref={formRef}
            >
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <textarea
                    id="title"
                    name="title"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
                <FieldError
                    formState={formState}
                    name="title"
                />
                <ButtonSubmit
                    label="Сохранить"
                    loading="Сохранение запись..."
                />
            </form>
        </>
    );
}
