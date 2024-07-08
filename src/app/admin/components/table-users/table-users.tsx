'use client';
import React, { useMemo, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { User } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDeletePost } from '@/hooks/admin/useDeletePost';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { rolesMap } from '@/constans/roles-map';

interface Props {
    users: User[];
    total: number;
    currentPage: number;
}

export const TableUsers: React.FC<Props> = ({ users, total, currentPage }) => {
    const page = useMemo(() => currentPage, [currentPage]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const createQueryString = useCreateQueryString(searchParams);

    const { mutateAsync, isPending } = useDeletePost();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const handleDeletePost = async (id: string | number) => {
        const findPost = users.find((post) => post.id === id);
        if (findPost) {
            setCurrentUser(findPost);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        if (currentUser) {
            await mutateAsync(currentUser?.id);
        }
        onClose();
        router.refresh();
    };

    const handleChngePage = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', String(page)));
        router.refresh();
    };
    const generateColumn = (post: User, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return <Link href={'/admin/user/edit/' + post.id}>Редактировать</Link>;
            case 'delete':
                return (
                    <Button
                        color="danger"
                        variant="bordered"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                    >
                        Удалить
                    </Button>
                );
            case 'role':
                return rolesMap[post?.role];
        }
        return getKeyValue(post, columnKey);
    };
    return (
        <>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={total}
                            onChange={handleChngePage}
                        />
                    </div>
                }
                classNames={{
                    wrapper: 'min-h-[222px]',
                }}
            >
                <TableHeader>
                    <TableColumn key="name">Имя</TableColumn>
                    <TableColumn key="id">ID</TableColumn>
                    <TableColumn key="role">Роль</TableColumn>
                    <TableColumn key="update">{''}</TableColumn>
                    <TableColumn key="delete">{''}</TableColumn>
                </TableHeader>
                <TableBody items={users}>
                    {(user) => (
                        <TableRow key={user.id}>
                            {(columnKey) => (
                                <TableCell>
                                    <div className={`text-black dark:text-white`}>
                                        {generateColumn(user, columnKey)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                title={`Вы хотите удалить этого пользователя?`}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleConfirm}
                textClose="Отмена"
                textConfirm="Удалить"
                isLoadingConfirm={isPending}
            ></Modal>
        </>
    );
};
