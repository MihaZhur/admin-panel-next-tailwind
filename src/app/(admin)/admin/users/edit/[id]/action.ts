'use server';
import { ValidationUserSchemaType } from '@/schemas/user-schema';
import { userService } from '@/services/user.service';
import { RateLimitService } from '@/services/rate-limit.service';
import { headers } from 'next/headers';

/**
 * Action function to update a user.
 *
 * @param userId - The ID of the user to update
 * @param userCreate - The new user data to update
 * @returns An object with a message and status indicating the result of the update
 */
export const userUserAction = async (userId: number, userCreate: ValidationUserSchemaType) => {
    try {
        // Update the user
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
