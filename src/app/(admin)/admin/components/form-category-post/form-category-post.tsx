'use client';
import { Button, Input } from '@nextui-org/react';
import { FieldError } from '../field-error';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryPostSchema, ValidationCategoryPostSchemaType } from '@/schemas/category-post-schema';
import { showToast } from '@/utils/show-toast';

interface Props {
    action: (data: ValidationCategoryPostSchemaType) => Promise<void>;
    initialValues?: {
        name: string;
    };
    btnText?: string;
    tostText?: string;
}
export const FormCategoryPost: React.FC<Props> = ({ initialValues, tostText, action: actionFn, btnText }) => {
    const router = useRouter();
    const [isPendingCreatePost, startIsPendingCreatePost] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(categoryPostSchema),
    });
    const onSubmit = async (data: ValidationCategoryPostSchemaType) => {
        startIsPendingCreatePost(async () => {
            try {
                await actionFn(data);
                router.push(`/admin/posts/categories`);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Название категории
            </label>
            <Input
                {...register('name')}
                type="text"
                id="name"
                label="Название категории"
                className="mb-3"
                color={errors.name?.message ? 'danger' : 'default'}
            />
            <FieldError error={errors.name?.message} />
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
    );
};
