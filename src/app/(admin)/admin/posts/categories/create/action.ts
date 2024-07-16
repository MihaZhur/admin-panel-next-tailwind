'use server';
import { ValidationCategoryPostSchemaType } from '@/schemas/category-post-schema';
import { categoryPostService } from '@/services/category-post.service';

export const createCategoryPostAction = async (dataCreate: ValidationCategoryPostSchemaType) => {
    try {
        const postData = await categoryPostService.createCategory(dataCreate.name);
        return { message: 'Категоря успешно создана!', postData, status: 'success' };
    } catch (error: any) {
        const message = error.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
