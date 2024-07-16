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
} from '@nextui-org/react';
import { CategoryPost } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { deleteCategoryByIdAction } from './action';
import { showToast } from '@/utils/show-toast';
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

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

    const [isPendingDeleteCategory, startIsPendingDeleteCategory] = useTransition();
    const [currentPost, setCurrentPost] = useState<CategoryPost | null>(null);
    const handleDeletePost = async (id: string | number) => {
        const findPost = categories.find((post) => post.id === id);
        if (findPost) {
            setCurrentPost(findPost);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        startIsPendingDeleteCategory(async () => {
            if (currentPost) {
                const res = await deleteCategoryByIdAction(currentPost?.id);
                showToast(res.status as any, res.message);
            }
            onClose();
            router.refresh();
        });
    };

    const handleChngePage = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', String(page)));
        router.refresh();
    };
    const generateColumn = (categiry: CategoryPost, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return (
                    <Button
                        as={Link}
                        href={'/admin/posts/categories/edit/' + categiry.id}
                        color="primary"
                        size="sm"
                        className=" mx-auto"
                        endContent={
                            <PencilSquareIcon
                                width={14}
                                height={14}
                            />
                        }
                    >
                        Редактировать
                    </Button>
                );
            case 'delete':
                return (
                    <Button
                        color="danger"
                        variant="bordered"
                        size="sm"
                        onClick={() => handleDeletePost(categiry.id)}
                        endContent={
                            <TrashIcon
                                width={14}
                                height={14}
                            />
                        }
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
                    <TableColumn key="id">ID</TableColumn>
                    <TableColumn key="name">Название категории</TableColumn>
                    <TableColumn
                        key="update"
                        align="end"
                    >
                        {''}
                    </TableColumn>
                    <TableColumn
                        key="delete"
                        align="end"
                    >
                        {''}
                    </TableColumn>
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
                isLoadingConfirm={isPendingDeleteCategory}
            ></Modal>
        </>
    );
};
