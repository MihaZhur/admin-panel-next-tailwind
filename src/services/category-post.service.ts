import prisma from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

interface CategoryParamsFilter {
    currentPage: number;
}

class CategoryPostService {
    LIMIT_ITEMS_PAGE = 10;
    constructor(private readonly prismaClient: PrismaClient) {}

    async getCategories({ currentPage }: CategoryParamsFilter) {
        const skip = (currentPage - 1) * this.LIMIT_ITEMS_PAGE;
        if (!prisma.categoryPost) {
            return {
                categories: [],
                total: 0,
                totalPages: 0,
            };
        }
        const categories = await this.prismaClient.categoryPost?.findMany({
            skip,
            take: this.LIMIT_ITEMS_PAGE,
        });

        const total = await this.prismaClient.categoryPost?.count();
        const totalPages = Math.ceil(total / this.LIMIT_ITEMS_PAGE);

        return {
            categories,
            total,
            totalPages,
        };
    }

    async getCategoryById(id: number) {
        const category = await this.prismaClient.categoryPost.findUnique({
            where: { id },
        });
        if (!category) {
            return notFound();
        }
        return category;
    }

    async createCategory(name: string) {
        const category = await this.prismaClient.categoryPost.create({
            data: { name },
        });
        return category;
    }

    async deleteCategoryById(id: number) {
        const deletedCategory = await this.prismaClient.categoryPost.delete({
            where: { id },
        });
        return deletedCategory;
    }

    async updateCategory(id: number, { name, preview }: { name: string; preview?: string }) {
        const category = await this.prismaClient.categoryPost.update({
            where: { id },
            data: { name, preview },
        });
        return category;
    }
}

export const categoryPostService = new CategoryPostService(prisma);
