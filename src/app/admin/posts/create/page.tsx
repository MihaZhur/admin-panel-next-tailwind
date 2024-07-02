
'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Posts() {
    const [value, setValue] = useState('')
    const router = useRouter()
    const handleCreatePost = async (e: any) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title: value }),
        })
        setTimeout(() => {
            router.push(`/admin/posts?refreshId=${new Date().getTime()}`)
        }, 0)
    }


    return (
        <>
            <form className="max-w-sm mx-auto" method="POST" onSubmit={handleCreatePost}>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea onChange={(e) => setValue(e.target.value)} value={value} id="title" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Создать пост</button>
            </form>

        </>
    );
}
