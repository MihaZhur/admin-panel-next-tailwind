'use server';
import { ValidationUserSchemaType } from '@/schemas/user-schema';
import { userService } from '@/services/user.service';

export const userUserAction = async (userId: number, userCreate: ValidationUserSchemaType) => {
    try {
        await userService.updateUser(userId, userCreate);
        return { message: 'Пользователь успешно отредактирован!', status: 'success' };
    } catch (error: any) {
        const message = error.message;
        return {
            message: message ? message : 'Неизвестная ошибка',
            status: 'error',
        };
    }
};
