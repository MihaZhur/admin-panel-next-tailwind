import { BodyPage, TablePosts } from '@/components/';

import { postService } from '@/services/post.service';
import { HeadPage } from '@/components/';
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
                    link={routes.adminPostsCreate}
                    linkTitle="Создать пост"
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
