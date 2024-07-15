'use client';
import { EditorText, FieldError } from '@/app/(admin)/admin/components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { showToast } from '@/utils/show-toast';
import { postSchema, ValidationPostSchemaType } from '@/schemas/post-schema';
import { CategoryPost } from '@prisma/client';

interface Props {
    action: (data: ValidationPostSchemaType) => Promise<void>;
    initialValues?: {
        title: string;
        content: string;
        published: boolean;
        categories: string[];
    };
    btnText?: string;
    tostText?: string;
    categories: CategoryPost[];
}
export const FormPost: React.FC<Props> = ({
    action: actionFn,
    initialValues,
    btnText,
    tostText = 'Пост успешно создан!',
    categories,
}) => {
    console.log(initialValues);

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
    const onSubmit = async (data: ValidationPostSchemaType) => {
        console.log(data);

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 flex justify-between">
                    <Switch
                        {...register('published')}
                        color="success"
                        name="published"
                        size="sm"
                        className="mb-3"
                    >
                        Опубликовать
                    </Switch>
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Категория поста"
                                placeholder="Выберите категорию поста"
                                className="max-w-xs"
                                multiple
                                selectionMode="multiple"
                                defaultSelectedKeys={field.value}
                                onSelectionChange={(selected) => field.onChange(Array.from(selected))}
                            >
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id.toString()}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>

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
