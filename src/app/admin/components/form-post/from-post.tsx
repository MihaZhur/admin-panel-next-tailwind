'use client';
import { ButtonSubmit, FieldError } from '@/app/admin/components/';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { showToast } from '@/utils/show-toast';
export const postSchema = z.object({
    title: z.string().min(2, { message: 'Слишком короткое название поста' }),
});
interface Props {
    action: any;
    initialValues?: {
        title: string;
    };
    btnText?: string;
    btnTextLoading?: string;
    tostText?: string;
}
export const FormPost: React.FC<Props> = ({
    action: actionFn,
    initialValues,
    btnText,
    tostText = 'Пост успешно создан',
}) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(postSchema),
    });
    const onSubmit = async (data: any) => {
        try {
            setIsloading(true);
            await actionFn(data);
            setIsloading(false);
            showToast('success', tostText);
            router.push(`/admin/posts`);
            router.refresh();
        } catch (err: any) {
            const message = err?.response?.data?.message;
            console.error(err);
            showToast('error', message);
        }
    };

    return (
        <>
            <form
                className=" mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <textarea
                    {...register('title')}
                    id="title"
                    rows={4}
                    className="block p-2.5 w-full text-sm mb-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
                <FieldError error={errors.title?.message} />

                <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    isDisabled={!isDirty}
                    isLoading={isLoading}
                >
                    {btnText}
                </Button>
            </form>
        </>
    );
};
