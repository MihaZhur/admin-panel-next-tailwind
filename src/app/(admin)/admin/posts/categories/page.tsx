import Link from 'next/link';
import { BodyPage, HeadPage, TablePostCategoryes } from '../../components';
import { PlusIcon } from '@heroicons/react/20/solid';
import { categoryPostService } from '@/services/category-post.service';

export default async function CategoriesPost({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;

    const { categories, totalPages } = await categoryPostService.getCategories({ currentPage });
    return (
        <>
            <BodyPage>
                <HeadPage
                    title="Категории блога"
                    linkTitle="Создать категорию"
                    link={'/admin/posts/categories/create'}
                />
                <TablePostCategoryes
                    categories={categories}
                    currentPage={currentPage}
                    total={totalPages}
                />
            </BodyPage>
        </>
    );
}
