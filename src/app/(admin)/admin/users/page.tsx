import { BodyPage, HeadPage } from '@/components';
import { TableUsers } from '@/components';
import { userService } from '@/services/user.service';

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
                link={'/admin/users/create'}
            />

            <TableUsers
                users={users}
                currentPage={currentPage}
                total={totalPages}
            />
        </BodyPage>
    );
}
