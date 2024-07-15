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
                    link={
                        <Link
                            href={'/admin/posts/categories/create'}
                            className="rounded-md  flex items-center gap-3 justify-center max-w-55 ml-auto bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="button"
                        >
                            Создать категорию
                            <PlusIcon className=" w-5" />
                        </Link>
                    }
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
