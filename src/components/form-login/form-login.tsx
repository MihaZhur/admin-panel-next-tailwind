'use client';
import { FieldError } from '@/app/admin/components';
import { loginSchema, ValidationLoginSchemaType } from '@/schemas/login-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export const FormLogin = () => {
    const router = useRouter();

    const [loginLoading, startRegistartionLoading] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationLoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: ValidationLoginSchemaType) => {
        startRegistartionLoading(async () => {
            try {
                const res = await signIn('credentials', { ...data, redirect: false });
                if (res?.ok && !res.error) {
                    router.push('/');
                    return;
                }
                showToast('error', res?.error);
            } catch (err: any) {
                showToast('error', err.message);
            }
        });
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-10">
            <div className="sm:mx-auto sm:w-full gap-3 flex justify-center items-center sm:max-w-sm">
                <Image
                    width={32}
                    height={32}
                    src={'/default/logo.png'}
                    alt="Logo"
                    priority
                />
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Авторизация</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                        action="#"
                        method="POST"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email адрес
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
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Пароль
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Забыли пароль?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input
                                    {...register('password')}
                                    variant="bordered"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Ваш пароль"
                                />
                                <FieldError error={errors.password?.message} />
                            </div>
                        </div>

                        <div>
                            <Button
                                color="primary"
                                type="submit"
                                variant="shadow"
                                size="lg"
                                isLoading={loginLoading}
                            >
                                Войти
                            </Button>
                        </div>
                    </form>
                </div>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                </p> */}
            </div>
        </div>
    );
};
