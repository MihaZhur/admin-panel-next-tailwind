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
                linkTitle="Создать пользователя"
                link={'/admin/posts/create'}
            />

            <TableUsers
                users={users}
                currentPage={currentPage}
                total={totalPages}
            />
        </BodyPage>
    );
}
