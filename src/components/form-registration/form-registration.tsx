'use client';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { FieldError } from '@/app/admin/components/field-error';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registationSchema, ValidationRegistrationSchemaType } from '@/schemas/registration-schema';
import Link from 'next/link';
import { registrationUser } from './action';
import { showToast } from '@/utils/show-toast';
import { useTransition } from 'react';

export function FormRegistration() {
    const [registrationLoading, startRegistartionLoading] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationRegistrationSchemaType>({
        resolver: zodResolver(registationSchema),
    });

    const onSubmit = (data: ValidationRegistrationSchemaType) => {
        startRegistartionLoading(async () => {
            try {
                const res = await registrationUser(data);
                if (res.status === 200) {
                    showToast('success', res.message);
                    return;
                }
                showToast('error', res.message);
            } catch (err: any) {
                showToast('error', err.message);
            }
        });
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto h-10 w-auto"
                    src="/default/logo.png"
                    alt="Workflow"
                    width={20}
                    height={20}
                />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Регистрация</h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                    Есть уже аккаутн?{' '}
                    <Link
                        href="/signin"
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        войти
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-6">
                            <Input
                                {...register('name')}
                                type="text"
                                name="name"
                                label="Ваше имя"
                                variant="bordered"
                            />
                        </div>

                        <div className="mt-6">
                            <Input
                                {...register('email')}
                                type="email"
                                name="email"
                                label="Ваш email"
                                variant="bordered"
                            />
                            <FieldError error={errors.email?.message} />
                        </div>

                        <div className="mt-6">
                            <Input
                                {...register('password')}
                                type="password"
                                name="password"
                                label="Ваш пароль"
                                variant="bordered"
                            />
                            <FieldError error={errors.password?.message} />
                        </div>

                        <div className="mt-6">
                            <Input
                                {...register('password_conformition')}
                                name="password_conformition"
                                type="password"
                                label="Подтвердить пароль"
                                variant="bordered"
                            />
                            <FieldError error={errors.password_conformition?.message} />
                        </div>

                        <div className="mt-6">
                            <Button
                                color="primary"
                                className=" w-full"
                                type="submit"
                                isLoading={registrationLoading}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
