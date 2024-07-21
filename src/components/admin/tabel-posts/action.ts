'use server';

import { postService } from '@/services/post.service';

export const deletePostByIdAction = async (categotyId: number) => {
    try {
        const res = await postService.deletePostById(categotyId);
        return { message: 'Пост успешно удален!', status: 'success' };
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
