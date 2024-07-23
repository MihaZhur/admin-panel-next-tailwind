'use client';
import { refreshPasswordSchema, ValidationRefreshPasswordSchemaType } from '@/schemas/refresh-password-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FieldError } from '../common';
import { refreshPasswordAction } from './action';

export const FormRefreshPassword = () => {
    const router = useRouter();

    const [isPendingRefreshPassword, startPendingRefreshPassword] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationRefreshPasswordSchemaType>({
        resolver: zodResolver(refreshPasswordSchema),
    });

    const onSubmit = (data: ValidationRefreshPasswordSchemaType) => {
        startPendingRefreshPassword(async () => {
            try {
                const res = await refreshPasswordAction(data.email);
                if (res?.status === 'success') {
                    router.push('/');
                    router.refresh();
                    return;
                }
                showToast('error', res?.message);
            } catch (err: any) {
                showToast('error', err.message);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Введите Ваш email
                </label>
                <div className="mt-2">
                    <Input
                        {...register('email')}
                        variant="bordered"
                        type="email"
                        name="email"
                        label="Ваш email"
                    />
                    <FieldError error={errors.email?.message} />
                </div>

                <div>
                    <Button
                        color="primary"
                        type="submit"
                        variant="shadow"
                        size="lg"
                        isLoading={isPendingRefreshPassword}
                    >
                        Сбросить пароль
                    </Button>
                </div>
            </div>
        </form>
    );
};
