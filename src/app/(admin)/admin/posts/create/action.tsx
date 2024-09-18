'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';

export const cretePostAction = async (
    authorId: number | string,
    dataCreate: ValidationPostSchemaType,
    file?: FormData,
) => {
    try {
        const fileData = file?.get('file') as File;
        const postData = await postService.createPost(+authorId, dataCreate, fileData);
        return { message: 'Пост успешно создан!', status: 'success', postData };
    } catch (error: any) {
        console.log(error);
        const message = error.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
