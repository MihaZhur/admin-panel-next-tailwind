'use server';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { postService } from '@/services/post.service';
import { uploadService } from '@/services/upload.service';

export const cretePostAction = async (authorId: number | string, dataCreate: ValidationPostSchemaType, file?: any) => {
    try {
        let pathImage;
        if (file) {
            const uploadEvent = await uploadService.uploadFile(file);
            pathImage = uploadEvent?.path;
        }
        const postData = await postService.createPost(+authorId, dataCreate, pathImage);
        return { message: 'Пост успешно создан!', postData };
    } catch (error: any) {
        console.log(error);
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
