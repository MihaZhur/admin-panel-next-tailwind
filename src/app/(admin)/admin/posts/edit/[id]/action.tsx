'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';

export const updatedPostAction = async (id: string, dataUpdate: ValidationPostSchemaType) => {
    try {
        await postService.editPost(+id, dataUpdate);
        return { message: 'Пост успешно отредактирован!' };
    } catch (error: any) {
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
