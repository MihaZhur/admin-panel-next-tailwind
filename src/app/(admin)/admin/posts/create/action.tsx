'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';
import { number } from 'zod';

export const cretePostAction = async (authorId: number | string, dataCreate: ValidationPostSchemaType) => {
    try {
        const postData = await postService.createPost(+authorId, dataCreate);
        return { message: 'Пост успешно создан!', postData };
    } catch (error: any) {
        console.log(error);
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
