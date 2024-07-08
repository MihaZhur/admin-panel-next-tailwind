'use server';
import prisma from '@/lib/db';

export const cretePostAction = async (formState: any) => {
    try {
        const postData = await prisma.post.create({
            data: formState,
        });
        return { message: 'Пост успешно создан!', data: postData };
    } catch (error: any) {
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
