'use client';

import { FieldError } from '@/components/common';
import { rolesMap } from '@/constans/roles-map';
import { userSchema, ValidationUserSchemaType } from '@/schemas/user-schema';
import { showToast } from '@/utils/show-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Input, Select, SelectItem, Switch } from '@nextui-org/react';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    action?: (data: ValidationUserSchemaType) => Promise<any>;
    initialValues?: {
        name: string;
        email: string;
        activated: boolean;
        role: Role;
    };
    btnText?: string;
    type: 'create' | 'update';
}
export const FormUser: React.FC<Props> = ({ action, initialValues, btnText = 'Сохранить', type }) => {
    const router = useRouter();
    const [isPendingCreateUser, startIsPendingCreateUser] = useTransition();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: ValidationUserSchemaType) => {
        if (!action) return;

        startIsPendingCreateUser(async () => {
            try {
                const res = await action(data);
                if (res.status === 'error') {
                    showToast('error', res.message);
                    return;
                }
                router.push('/admin/users');
                router.refresh();
                showToast('success', res.message);
            } catch (err: any) {
                const message = err?.message;
                console.error(err);
                showToast('error', message);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isRequired
                            label="Роль пользователя"
                            placeholder="Выберите роль пользователя"
                            className="max-w-xs"
                            defaultSelectedKeys={[initialValues?.role || 'USER']}
                            onSelectionChange={(selected) => {
                                field.onChange(Array.from(selected)[0]);
                            }}
                        >
                            {Object.keys(rolesMap).map((role) => {
                                const key = role as keyof typeof rolesMap;
                                return (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className="dark:text-white"
                                    >
                                        {rolesMap[key]}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    )}
                />
                <FieldError error={errors.role?.message} />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email пользователя
                </label>
                <Input
                    errorMessage={errors.email?.message}
                    label="Email"
                    {...register('email')}
                    type="email"
                    isDisabled={type === 'update'}
                />
                <FieldError error={errors.email?.message} />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Имя пользователя
                </label>

                <Input
                    errorMessage={errors.name?.message}
                    label="Имя пользователя"
                    {...register('name')}
                    type="text"
                />
                <FieldError error={errors.name?.message} />
            </div>
            <div className="mb-3">
                <Switch
                    {...register('activated')}
                    color="success"
                    size="sm"
                    className="mb-3"
                >
                    Статус активации
                </Switch>
            </div>
            <Divider className="my-3" />
            <Button
                color="primary"
                type="submit"
                isDisabled={!isDirty}
                isLoading={isPendingCreateUser}
            >
                {btnText}
            </Button>
        </form>
    );
};
