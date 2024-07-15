import Link from 'next/link';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { TableUsers } from '../components/table-users/table-users';
import { userService } from '@/services/user.service';
import { BodyPage } from '../components';
import { HeadPage } from '../components/body-page';

export default async function Users({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;

    const { users, totalPages } = await userService.getUsers({ currentPage });

    return (
        <BodyPage>
            <HeadPage
                title="Пользователи"
                link={
                    <Link
                        href={'/admin/posts/create'}
                        className="rounded-md  flex items-center gap-3 justify-center max-w-54 ml-auto bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="button"
                    >
                        Создать пользователя
                        <UserPlusIcon className=" w-5" />
                    </Link>
                }
            />

            <TableUsers
                users={users}
                currentPage={currentPage}
                total={totalPages}
            />
        </BodyPage>
    );
}
