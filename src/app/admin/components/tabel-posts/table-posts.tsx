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
import { Post } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDeletePost } from '@/hooks/admin/useDeletePost';
import { Modal } from '../modal';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

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

    const { mutateAsync, isPending } = useDeletePost();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const handleDeletePost = async (id: string | number) => {
        const findPost = posts.find((post) => post.id === id);
        if (findPost) {
            setCurrentPost(findPost);
        }
        onOpen();
    };
    const handleConfirm = async () => {
        if (currentPost) {
            await mutateAsync(currentPost?.id);
        }
        onClose();
        router.refresh();
    };

    const handleChngePage = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', String(page)));
        router.refresh();
    };
    const generateColumn = (post: Post, columnKey: any) => {
        switch (columnKey) {
            case 'update':
                return <Link href={'/admin/posts/edit/' + post.id}>Редактировать</Link>;
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
            case 'published':
                return post.published ? 'Опубликован' : 'Не опубликован';
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
                    <TableColumn key="title">Заголовок</TableColumn>
                    <TableColumn key="id">ID</TableColumn>
                    <TableColumn key="published">Статус</TableColumn>
                    <TableColumn key="update">{''}</TableColumn>
                    <TableColumn key="delete">{''}</TableColumn>
                </TableHeader>
                <TableBody items={posts}>
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
                isLoadingConfirm={isPending}
            ></Modal>
        </>
    );
};
