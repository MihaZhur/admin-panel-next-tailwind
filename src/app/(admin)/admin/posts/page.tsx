import Link from 'next/link';
import { BodyPage, TablePosts } from '../components';
import { PlusIcon } from '@heroicons/react/20/solid';
import { postService } from '@/services/post.service';
import { HeadPage } from '../components/body-page';
import { redirect } from 'next/navigation';
import { routes } from '@/constans/routes';

export const dynamic = 'force-dynamic';
export default async function Posts({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;

    const { posts, totalPages } = await postService.getPosts({ currentPage });

    if (currentPage > totalPages) {
        redirect(routes.adminPosts);
    }

    return (
        <>
            <BodyPage>
                <HeadPage
                    title="Статьи блога"
                    link={
                        <Link
                            href={routes.adminPostsCreate}
                            className="rounded-md  flex items-center gap-3 justify-center max-w-36 ml-auto bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="button"
                        >
                            Создать пост
                            <PlusIcon className=" w-5" />
                        </Link>
                    }
                />
                <TablePosts
                    posts={posts}
                    currentPage={currentPage}
                    total={totalPages}
                />
            </BodyPage>
        </>
    );
}
