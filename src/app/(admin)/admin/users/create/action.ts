'use server';
import { ValidationUserSchemaType } from '@/schemas/user-schema';
import { userService } from '@/services/user.service';

export const createUserAction = async (userCreate: ValidationUserSchemaType) => {
    try {
        await userService.createUser(userCreate);
        return { message: 'Пользователь успешно создан!', status: 'success' };
    } catch (error: any) {
        const message = error.message;
        return {
            message: message ? message : 'Неизвестная ошибка',
            status: 'error',
        };
    }
};
