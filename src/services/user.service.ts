import prisma from '@/lib/db';
import { PrismaClient } from '@prisma/client';

class UserService {
    LIMIT_ITEMS_PAGE = 10;
    constructor() {}

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }

    async getUserByCode(code_activated: string) {
        const user = await prisma.user.findFirst({
            where: { code_activated },
        });

        return user;
    }
    async updateCode(userId: number) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                activated: true,
                code_activated: null,
            },
        });
        return true;
    }

    async getUsers({ currentPage }: { currentPage: number }) {
        const skip = (currentPage - 1) * this.LIMIT_ITEMS_PAGE;
        const users = await prisma.user.findMany({
            skip: skip,
            take: this.LIMIT_ITEMS_PAGE,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                activated: true,
            },
        });

        const total = await prisma.user.count();

        const totalPages = Math.ceil(total / this.LIMIT_ITEMS_PAGE);

        return {
            users,
            totalPages,
            total,
        };
    }
}

export const userService = new UserService();
