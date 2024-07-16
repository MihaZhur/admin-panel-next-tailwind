'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';
import { uploadService } from '@/services/upload.service';

export const updatedPostAction = async (id: string, dataUpdate: ValidationPostSchemaType, file: FormData) => {
    try {
        const fileData = file.get('file') as File;
        await postService.editPost(+id, dataUpdate, fileData);
        return { message: 'Пост успешно отредактирован!', status: 'success' };
    } catch (error: any) {
        const message = error.message;
        return {
            message: message ? message : 'Неизвестная ошибка',
            status: 'error',
        };
    }
};
