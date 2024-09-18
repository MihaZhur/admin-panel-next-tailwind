'use client';
import { refreshPasswordSchema, ValidationRefreshPasswordSchemaType } from '@/schemas/refresh-password-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FieldError } from '../common';
import { refreshPasswordAction } from './action';
import { routes } from '@/constans/routes';

interface Props {
    refreshCode: string;
}

export const FormRefreshPassword: React.FC<Props> = ({ refreshCode }) => {
    const router = useRouter();
    const [loginLoading, startRegistartionLoading] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationRefreshPasswordSchemaType>({
        resolver: zodResolver(refreshPasswordSchema),
    });

    const onSubmit = (data: ValidationRefreshPasswordSchemaType) => {
        if (!refreshCode) {
            showToast('error', 'Код обновления не найден');
            return;
        }

        startRegistartionLoading(async () => {
            try {
                const res = await refreshPasswordAction(refreshCode, data.password);
                if (res?.status === 'success') {
                    showToast('success', res?.message);
                    router.push(routes.signIn);
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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-10">
            <div className="sm:mx-auto sm:w-full gap-3 flex justify-center items-center sm:max-w-sm">
                <Image
                    width={32}
                    height={32}
                    src={'/default/logo.png'}
                    alt="Logo"
                    priority
                />
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Изменить пароль
                </h2>
            </div>

            <div className="mt-8 min-w-115 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
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
                        </div>

                        <div>
                            <Button
                                color="primary"
                                type="submit"
                                variant="shadow"
                                size="lg"
                                isLoading={loginLoading}
                            >
                                Изменить пароль
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
