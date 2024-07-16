'use client';
import { ButtonUploader, EditorText } from '@/app/(admin)/admin/components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { showToast } from '@/utils/show-toast';
import { postSchema, ValidationPostSchemaType } from '@/schemas/post-schema';
import { CategoryPost } from '@prisma/client';
import Image from 'next/image';
import { validateFile } from '@/utils/validate-file';
import { FieldError } from '@/components';
interface Props {
    action: (data: ValidationPostSchemaType, file: any) => Promise<any>;
    initialValues?: {
        title: string;
        content: string;
        published: boolean;
        categories: string[];
        preview: string | null;
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
    const [filePreview, setFilePreview] = useState<File>();
    const [imagePath, setImagePath] = useState<string | null>(initialValues?.preview ?? null);

    const router = useRouter();
    const [isPendingCreatePost, startIsPendingCreatePost] = useTransition();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(postSchema),
    });
    const onSubmit = async (data: ValidationPostSchemaType) => {
        startIsPendingCreatePost(async () => {
            const fileFormData = new FormData();
            if (filePreview) {
                fileFormData.append('file', filePreview);
            }

            try {
                const res = await actionFn(data, fileFormData);
                if (res.status === 'error') {
                    showToast('error', res.message);
                    return;
                }
                router.push(`/admin/posts`);
                router.refresh();
                showToast('success', tostText);
            } catch (err: any) {
                const message = err?.message;
                console.error(err);
                showToast('error', message);
            }
        });
    };

    useEffect(() => {
        if (filePreview) {
            try {
                const url = URL.createObjectURL(filePreview);
                if (validateFile(filePreview)) {
                    setImagePath(url);
                    setValue('preview', url, { shouldDirty: true });
                }
            } catch (error: any) {
                const message = error?.message;
                console.warn(message);
                showToast('error', message);
            }
        }
    }, [filePreview, setValue]);

    return (
        <>
            <div className="mb-3">
                <ButtonUploader
                    file={imagePath}
                    onChange={(file) => setFilePreview(file)}
                    text="Загрузить превью"
                />
            </div>
            {imagePath && (
                <Image
                    src={imagePath ?? ''}
                    alt={initialValues?.title || 'Preview'}
                    width={400}
                    height={300}
                />
            )}
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
