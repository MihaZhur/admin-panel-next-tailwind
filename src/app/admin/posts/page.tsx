import Link from 'next/link';
import { Pagination } from '../components/pagination';
import { Table } from '../components/table';

const head = ['Название стаьи', 'id', '', 'Удалить'];

export default async function Posts({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const staticData = await fetch(`http://localhost:3000/api/posts/?page=${currentPage}`, { cache: 'no-store' });

    const data = await staticData.json();
    const { posts, totalPages } = data;

    return (
        <>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-lg text-blueGray-700">Статьи</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link
                                        href={'/admin/posts/create'}
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        type="button"
                                    >
                                        Создать пост
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Table data={{ head, row: posts }} />
                        {totalPages > 1 && (
                            <Pagination
                                forcePage={currentPage - 1}
                                pageCount={totalPages}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
