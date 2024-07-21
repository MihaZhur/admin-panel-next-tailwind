'use server';
import { categoryPostService } from '@/services/category-post.service';

export const deleteCategoryByIdAction = async (categotyId: number) => {
    try {
        const res = await categoryPostService.deleteCategoryById(categotyId);
        return { message: 'Категоря успешно удалена!', status: 'success' };
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
