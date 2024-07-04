'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

export const Pagination: React.FC<ReactPaginateProps> = ({ ...restProps }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams],
    );
    return (
        <ReactPaginate
            onPageChange={(page) => router.push(pathname + '?' + createQueryString('page', String(page.selected + 1)))}
            containerClassName={'flex justify-center gap-4 isolate items-center rounded-md shadow-sm py-4'}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            previousLabel={
                <ChevronLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            }
            activeClassName="bg-indigo-600 text-white"
            pageClassName="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            nextLabel={
                <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            }
            renderOnZeroPageCount={null}
            {...restProps}
        />
    );
};
