'use server';

import prisma from '@/lib/db';

export const updatedPostAction = async (id: string, formState: FormData | any) => {
    try {
        // const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({ ...formState }),
        // });
        const post = await prisma.post.update({
            where: {
                id: +id,
            },
            data: formState,
        });
        return { message: 'Пост успешно отредактирован!' };
    } catch (error: any) {
        const message = error.message;
        return message ? message : 'Неизвестная ошибка';
    }
};
