import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation'

export default function Create() {
    const handleCreatePost = async (formData: FormData) => {
        'use server';
        const data = {
            title: formData.get('title'),
        };
        // e.preventDefault();
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ ...data }),
        });
        revalidateTag('posts');
        const url = '/admin/posts';
        redirect(url);
        // router.push(`/admin/posts`);
        // router.refresh();
    };

    return (
        <>
            <form
                className=" mx-auto"
                method="POST"
                action={handleCreatePost}
            >
                <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Название поста
                </label>
                <textarea
                    name="title"
                    id="title"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
                <button
                    type="submit"
                    className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Создать
                </button>
            </form>
        </>
    );
}
