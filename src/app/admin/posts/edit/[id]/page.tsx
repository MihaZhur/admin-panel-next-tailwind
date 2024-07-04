'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetPost } from '@/hooks/useGetPost';
import { useUpdatePost } from '@/hooks/useUpdatePost';

export default function EditPost() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data } = useGetPost(id);
    const [value, setValue] = useState('');
    const { mutateAsync: updatePost } = useUpdatePost();

    const handleUpdatePost = async (e: any) => {
        e.preventDefault();
        await updatePost({ id: data?.id as string, title: value });
        router.push(`/admin/posts`);
        router.refresh();
    };

    useEffect(() => {
        if (data?.title) {
            setValue(data?.title);
        }
    }, [data]);

    return (
        <>
            <form
                className=" mx-auto"
                method="POST"
                onSubmit={handleUpdatePost}
            >
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <textarea
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    id="title"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
                <button
                    type="submit"
                    className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Сохранить
                </button>
            </form>
        </>
    );
}
