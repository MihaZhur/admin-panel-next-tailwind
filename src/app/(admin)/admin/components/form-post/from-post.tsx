'use client';
import { EditorText, FieldError } from '@/app/(admin)/admin/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Switch } from '@nextui-org/react';
import { showToast } from '@/utils/show-toast';
export const postSchema = z.object({
    title: z.string().min(2, { message: 'Слишком короткое название поста' }),
    content: z.string(),
    published: z.boolean(),
});
interface Props {
    action: any;
    initialValues?: {
        title: string;
        content: string;
        published: boolean;
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
    const [isPendingCreatePost, startIsPendingCreatePost] = useTransition();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(postSchema),
    });
    const onSubmit = async (data: any) => {
        startIsPendingCreatePost(async () => {
            try {
                await actionFn(data);
                router.push(`/admin/posts`);
                router.refresh();
                showToast('success', tostText);
            } catch (err: any) {
                const message = err?.response?.data?.message;
                console.error(err);
                showToast('error', message);
            }
        });
    };

    return (
        <>
            <form
                className=" mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Switch
                    {...register('published')}
                    color="success"
                    name="published"
                    size="sm"
                    className="mb-3"
                >
                    Опубликовать
                </Switch>
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <Input
                    {...register('title')}
                    type="text"
                    id="title"
                    label="Название поста"
                    className="mb-3"
                    color={errors.title?.message ? 'danger' : 'default'}
                />
                <FieldError error={errors.title?.message} />
                <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Контент поста
                </label>
                <EditorText
                    control={control}
                    name="content"
                    defaultValue={initialValues?.content ?? ''}
                />

                <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    isDisabled={!isDirty}
                    isLoading={isPendingCreatePost}
                >
                    {btnText}
                </Button>
            </form>
        </>
    );
};
