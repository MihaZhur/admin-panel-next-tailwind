'use client';
import { resetPasswordSchema, ValidationResetPasswordSchemaType } from '@/schemas/reset-password-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FieldError } from '../common';
import { resetPasswordAction } from './action';

export const FormResetPassword = () => {
    const router = useRouter();

    const [isPendingResetPassword, startPendingResetPassword] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ValidationResetPasswordSchemaType) => {
        startPendingResetPassword(async () => {
            try {
                const res = await resetPasswordAction(data.email);
                if (res?.status === 'success') {
                    showToast('success', res?.message);
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
            className="space-y-6 p-6"
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Введите email
                </label>
                <div className="mt-4">
                    <Input
                        {...register('email')}
                        variant="bordered"
                        type="email"
                        label="Ваш email"
                    />
                    <FieldError error={errors.email?.message} />
                </div>

                <div className="mt-4">
                    <Button
                        color="primary"
                        type="submit"
                        variant="shadow"
                        size="lg"
                        isLoading={isPendingResetPassword}
                    >
                        Сбросить пароль
                    </Button>
                </div>
            </div>
        </form>
    );
};
