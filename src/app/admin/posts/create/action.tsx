'use server';
import prisma from '@/lib/db';

export const cretePostAction = async (authorId: number | string, formState: any) => {
    try {
        console.log(authorId, formState);

        const postData = await prisma.post.create({
            data: {
                authorId: +authorId,
                ...formState,
            },
        });

        return { message: 'Пост успешно создан!', data: postData };
    } catch (error: any) {
        console.log(error);
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
