'use server';

import { userService } from '@/services/user.service';

export const refreshPasswordAction = async (refreshCode: string, newPassword: string) => {
    try {
        await userService.refreshPassword(refreshCode, newPassword);
        return { message: 'Пароль успешно обновлен', status: 'success' };
    } catch (error: any) {
        const message = error.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
