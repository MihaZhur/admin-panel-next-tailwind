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
import { CategoryPost } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDeletePost } from '@/hooks/admin/useDeletePost';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

interface Props {
    categories: CategoryPost[];
    total: number;
    currentPage: number;
}

export const TablePostCategoryes: React.FC<Props> = ({ categories, total, currentPage }) => {
    const page = useMemo(() => currentPage, [currentPage]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const createQueryString = useCreateQueryString(searchParams);

    // const { mutateAsync, isPending } = useDeletePost();
    const [currentPost, setCurrentPost] = useState<CategoryPost | null>(null);
    const handleDeletePost = async (id: string | number) => {
        const findPost = categories.find((post) => post.id === id);
        if (findPost) {
            setCurrentPost(findPost);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        if (currentPost) {
            // await mutateAsync(currentPost?.id);
        }
        onClose();
        router.refresh();
    };

    const handleChngePage = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', String(page)));
        router.refresh();
    };
    const generateColumn = (categiry: CategoryPost, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return <Link href={'/admin/posts/categories/edit/' + categiry.id}>Редактировать</Link>;
            case 'delete':
                return (
                    <Button
                        color="danger"
                        variant="bordered"
                        size="sm"
                        onClick={() => handleDeletePost(categiry.id)}
                    >
                        Удалить
                    </Button>
                );
        }
        return getKeyValue(categiry, columnKey);
    };
    return (
        <>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    categories.length > 0 && (
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
                    )
                }
                classNames={{
                    wrapper: 'min-h-[222px]',
                }}
            >
                <TableHeader>
                    <TableColumn key="name">Название категории</TableColumn>
                    <TableColumn key="id">ID</TableColumn>
                    <TableColumn key="update">{''}</TableColumn>
                    <TableColumn key="delete">{''}</TableColumn>
                </TableHeader>
                <TableBody
                    items={categories}
                    emptyContent={'Категории не найдены.'}
                >
                    {(category) => (
                        <TableRow key={category!.id}>
                            {(columnKey) => (
                                <TableCell>
                                    <div className={`text-black dark:text-white`}>
                                        {generateColumn(category, columnKey)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                title={`Вы хотите удалить эту категорию?`}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleConfirm}
                textClose="Отмена"
                textConfirm="Удалить"
                // isLoadingConfirm={isPending}
            ></Modal>
        </>
    );
};
