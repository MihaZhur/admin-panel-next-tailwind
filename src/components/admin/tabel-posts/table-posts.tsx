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
    Chip,
} from '@nextui-org/react';
import { Post } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { deletePostByIdAction } from './action';
import { showToast } from '@/utils/show-toast';

interface Props {
    posts: Post[];
    total: number;
    currentPage: number;
}

export const TablePosts: React.FC<Props> = ({ posts, total, currentPage }) => {
    const page = useMemo(() => currentPage, [currentPage]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const createQueryString = useCreateQueryString(searchParams);

    const [isPendingDelete, startIsPendingDelete] = useTransition();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const handleDeletePost = async (id: string | number) => {
        const findPost = posts.find((post) => post.id === id);
        if (findPost) {
            setCurrentPost(findPost);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        startIsPendingDelete(async () => {
            if (currentPost) {
                const res = await deletePostByIdAction(currentPost?.id);
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
    const generateColumn = (post: Post, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return (
                    <Button
                        as={Link}
                        href={'/admin/posts/edit/' + post.id}
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
                        onClick={() => handleDeletePost(post.id)}
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
            case 'published':
                return post.published ? (
                    <Chip
                        color="success"
                        variant="shadow"
                        size="sm"
                        className="text-white"
                    >
                        Опубликован
                    </Chip>
                ) : (
                    <Chip
                        color="warning"
                        variant="shadow"
                        size="sm"
                        className="text-white"
                    >
                        Не опубликован
                    </Chip>
                );
        }
        return getKeyValue(post, columnKey);
    };
    return (
        <>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    posts.length > 0 && (
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
                    <TableColumn key="title">Заголовок</TableColumn>

                    <TableColumn key="published">Статус</TableColumn>
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
                    items={posts}
                    emptyContent={'Посты не найдены.'}
                >
                    {(post) => (
                        <TableRow key={post!.id}>
                            {(columnKey) => (
                                <TableCell>
                                    <div className={`text-black dark:text-white`}>
                                        {generateColumn(post, columnKey)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                title={`Вы хотите удалить этот пост?`}
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
