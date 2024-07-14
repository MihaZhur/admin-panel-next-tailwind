import Link from 'next/link';
import { TablePosts } from '../components';
import { PlusIcon } from '@heroicons/react/20/solid';
import prisma from '@/lib/db';

const LIMIT_ITEM_PAGE = 10;
export default async function Posts({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const skip = (currentPage - 1) * LIMIT_ITEM_PAGE;
    const posts = await prisma.post.findMany({
        skip: skip,
        take: LIMIT_ITEM_PAGE,
    });

    const total = await prisma.post.count();

    const totalPages = Math.ceil(total / LIMIT_ITEM_PAGE);

    return (
        <>
            <section className="py-1 ">
                <div className="w-full mb-12 xl:mb-0  mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-lg text-blueGray-700 dark:text-white">Статьи</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link
                                        href={'/admin/posts/create'}
                                        className="rounded-md  flex items-center gap-3 justify-center max-w-36 ml-auto bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        type="button"
                                    >
                                        Создать пост
                                        <PlusIcon className=" w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <TablePosts
                            posts={posts}
                            currentPage={currentPage}
                            total={totalPages}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
