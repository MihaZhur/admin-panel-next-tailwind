import prisma from '@/lib/db';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { UploadService, uploadService } from './upload.service';

interface PostParamsFilter {
    currentPage: number;
    sort?: 'asc' | 'desc';
}

class PostService {
    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly uploadService: UploadService,
    ) {}

    LIMIT_ITEMS_PAGE = 10;
    async getPosts({ currentPage, sort = 'desc' }: PostParamsFilter) {
        const skip = (currentPage - 1) * this.LIMIT_ITEMS_PAGE;
        const posts = await this.prismaClient.post.findMany({
            skip: skip,
            take: this.LIMIT_ITEMS_PAGE,
            orderBy: {
                updatedAt: sort, // 'desc' для сортировки по убыванию (последний пост сверху)
            },
        });

        const total = await this.prismaClient.post.count();

        const totalPages = Math.ceil(total / this.LIMIT_ITEMS_PAGE);
        return {
            posts,
            total,
            totalPages,
        };
    }

    async getPostById(id: number) {
        const post = await this.prismaClient.post.findUnique({
            where: {
                id: id,
            },
            include: {
                categories: true,
            },
        });

        if (!post) {
            return notFound();
        }
        const { title, content, published, categories, preview } = post;
        return { title, content, published, preview, categories: categories.map((category) => String(category.id)) };
    }
    async editPost(id: number, { categories, ...data }: ValidationPostSchemaType, file?: File | null | '') {
        try {
            const currentPost = await this.prismaClient.post.findUnique({
                where: { id },
            });
            console.log(currentPost, `file: ${file}`);

            let pathImage = currentPost?.preview;

            if (file) {
                pathImage = await this.uploadService.uploadFile(file, 'posts');
                if (currentPost?.preview) {
                    await this.uploadService.deleteFile(currentPost.preview);
                }
            }
            if (file === '') {
                pathImage = null;
                if (currentPost?.preview) {
                    await this.uploadService.deleteFile(currentPost.preview);
                }
            }

            const post = await this.prismaClient.post.update({
                where: { id },
                data: {
                    ...data,
                    categories: {
                        set: categories?.map((category) => ({ id: Number(category) })),
                    },
                    preview: pathImage,
                },
            });

            return post;
        } catch (error: any) {
            console.error('Ошибка при редактировании поста:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при редактировании поста');
        }
    }

    async createPost(authorId: number, { categories, ...data }: ValidationPostSchemaType, file?: File) {
        try {
            let pathImage;
            if (file) {
                pathImage = await this.uploadService.uploadFile(file, 'posts');
            }

            const post = await this.prismaClient.post.create({
                data: {
                    categories: {
                        connect: categories?.map((category) => ({ id: Number(category) })),
                    },
                    authorId,
                    ...data,
                    preview: pathImage,
                },
            });

            return post;
        } catch (error: any) {
            console.error('Ошибка при создании поста:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при создании поста');
        }
    }

    async deletePostById(id: number) {
        try {
            const currentPost = await this.prismaClient.post.findUnique({
                where: { id },
            });

            if (!currentPost) {
                throw new Error('Пост не найден');
            }

            await this.prismaClient.post.delete({
                where: { id },
            });

            if (currentPost.preview) {
                await this.uploadService.deleteFile(currentPost.preview);
            }

            console.log(`Пост с id ${id} успешно удален`);
        } catch (error: any) {
            console.error('Ошибка при удалении поста:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при удалении поста');
        }
    }
}

export const postService = new PostService(prisma, uploadService);
