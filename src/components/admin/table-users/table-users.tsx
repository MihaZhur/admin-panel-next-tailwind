'use client';
import React, { useMemo, useState, useTransition } from 'react';
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
    user,
} from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { rolesMap } from '@/constans/roles-map';
import { User } from '@/types/user';
import { deleteUserByIdAction } from './action';
import { showToast } from '@/utils/show-toast';

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
    const [isPendingDelete, startIsPendingDelete] = useTransition();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const handleDeleteUser = async (id: string | number) => {
        const findUser = users.find((user) => user.id === id);
        if (findUser) {
            setCurrentUser(findUser);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        startIsPendingDelete(async () => {
            try {
                if (currentUser) {
                    const res = await deleteUserByIdAction(currentUser?.id);
                    if (res.status === 'error') {
                        showToast(res.status as any, res.message);
                        return;
                    }
                    showToast(res.status as any, res.message);
                }
                onClose();
                router.refresh();
            } catch (error: any) {
                console.error('Ошибка при обновлении пользователя:', error);
                const message = error.message;
                showToast('error', message);
            }
        });
    };

    const handleChangePage = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', String(page)));
        router.refresh();
    };
    const generateColumn = (post: User, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return <Link href={'/admin/users/edit/' + post.id}>Редактировать</Link>;
            case 'delete':
                return (
                    <Button
                        color="danger"
                        variant="bordered"
                        size="sm"
                        onClick={() => handleDeleteUser(post.id)}
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
                    users.length > 0 && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={total}
                                onChange={handleChangePage}
                            />
                        </div>
                    )
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
                isLoadingConfirm={isPendingDelete}
            ></Modal>
        </>
    );
};
