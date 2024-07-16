'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';
import { uploadService } from '@/services/upload.service';

export const updatedPostAction = async (id: string, dataUpdate: ValidationPostSchemaType, file: FormData) => {
    console.log(dataUpdate, file);
    try {
        let pathImage;
        if (file.get('file')) {
            const path = await uploadService.uploadFile(file.get('file') as File, 'posts');
            pathImage = path;
        }
        await postService.editPost(+id, dataUpdate, pathImage);
        return { message: 'Пост успешно отредактирован!' };
    } catch (error: any) {
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
