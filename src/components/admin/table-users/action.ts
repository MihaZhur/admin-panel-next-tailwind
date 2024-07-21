'use server';

import { userService } from '@/services/user.service';

export const deleteUserByIdAction = async (userdId: number) => {
    try {
        const res = await userService.deleteUser(userdId);
        return { message: 'Пользователь успешно удален!', status: 'success' };
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
