'use client';
import { loginSchema, ValidationLoginSchemaType } from '@/schemas/login-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FieldError } from '../common';
import { FormResetPassword } from '@/components';
import { rateLimitValidateAction } from './action';
import { signIn } from 'next-auth/react';

export const FormLogin = () => {
    const router = useRouter();
    const { onOpen, onClose, isOpen } = useDisclosure();
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
                await rateLimitValidateAction();
                const res = await signIn('credentials', { ...data, redirect: false });
                if (!res?.ok) {
                    throw new Error(res?.error ?? 'Неизвестная ошибка');
                }
                router.push('/');
                router.refresh();
            } catch (err: any) {
                showToast('error', err.message);
            }
        });
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-10">
            <div className="sm:mx-auto sm:w-full gap-3 flex justify-center items-center sm:max-w-sm">
                <div className="max-w-8">
                    <Image
                        width={32}
                        height={32}
                        src={'/default/logo.png'}
                        alt="Logo"
                        priority
                    />
                </div>
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
                                    <button
                                        onClick={onOpen}
                                        type="button"
                                        className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500"
                                    >
                                        Забыли пароль?
                                    </button>
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
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    backdrop={'blur'}
                >
                    <ModalContent>{() => <FormResetPassword />}</ModalContent>
                </Modal>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                </p> */}
            </div>
        </div>
    );
};
