import prisma from '@/lib/db';
import { ValidationPostSchemaType } from '@/schemas/post-schema';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

interface PostParamsFilter {
    currentPage: number;
    sort?: 'asc' | 'desc';
}

class PostService {
    constructor(private readonly prismaClient: PrismaClient) {}

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
    async editPost(id: number, { categories, ...data }: ValidationPostSchemaType) {
        const post = await this.prismaClient.post.update({
            where: {
                id: +id,
            },
            data: {
                ...data,
                categories: {
                    set: categories?.map((category) => ({ id: Number(category) })),
                },
            },
        });
        return post;
    }

    async createPost(authorId: number, { categories, ...data }: ValidationPostSchemaType) {
        const post = await this.prismaClient.post.create({
            data: {
                categories: {
                    connect: categories?.map((category) => {
                        return { id: Number(category) };
                    }),
                },
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

export const postService = new PostService(prisma);
