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
        console.log(post);

        if (!post) {
            return notFound();
        }
        const { title, content, published, categories } = post;
        return { title, content, published, categories: categories.map((category) => String(category.id)) };
    }
    async editPost(id: number, { categories, ...data }: ValidationPostSchemaType, pathImage?: string) {
        try {
            // Получаем текущий пост, чтобы узнать текущий путь к изображению
            const currentPost = await this.prismaClient.post.findUnique({
                where: {
                    id: +id,
                },
            });

            const post = await this.prismaClient.post.update({
                where: {
                    id: +id,
                },
                data: {
                    ...data,
                    categories: {
                        set: categories?.map((category) => ({ id: Number(category) })),
                    },
                    preview: pathImage,
                },
            });
            // Если новое изображение задано и отличается от текущего, удаляем старое изображение
            if (pathImage && currentPost?.preview && currentPost.preview !== pathImage) {
                await this.uploadService.deleteFile(currentPost.preview);
            }
            return post;
        } catch (error) {
            console.error('Ошибка при редактировании поста:', error);
            throw new Error('Ошибка при редактировании поста');
        }
    }

    async createPost(authorId: number, { categories, ...data }: ValidationPostSchemaType, fileName?: string) {
        const post = await this.prismaClient.post.create({
            data: {
                categories: {
                    connect: categories?.map((category) => {
                        return { id: Number(category) };
                    }),
                },
                preview: fileName,
                authorId,
                ...data,
            },
        });
        return post;
    }

    async deletePostById(id: number) {
        const deletedPost = await this.prismaClient.post.delete({
            where: {
                id,
            },
        });
        return deletedPost;
    }
}

export const postService = new PostService(prisma, uploadService);
