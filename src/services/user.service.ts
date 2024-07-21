import prisma from '@/lib/db';
import { ValidationUserSchemaType } from '@/schemas/user-schema';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

class UserService {
    LIMIT_ITEMS_PAGE = 10;
    userUserAction: any;
    constructor() {}

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return notFound();
        }
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
    async createUser(data: ValidationUserSchemaType) {
        try {
            const candidate = await this.getUserByEmail(data.email);
            if (candidate) {
                throw new Error('Пользователь с таким email уже существует');
            }
            const newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    activated: data.activated,
                    role: data.role,
                },
            });
            return newUser;
        } catch (error: any) {
            console.error('Ошибка при создании пользователя:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при создании пользователя');
        }
    }

    async updateUser(id: number, data: ValidationUserSchemaType) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name,
                    activated: data.activated,
                    role: data.role,
                },
            });
            return updatedUser;
        } catch (error: any) {
            console.error('Ошибка при обновлении пользователя:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при обновлении пользователя');
        }
    }
    async deleteUser(id: number) {
        const deletedUser = await prisma.user.delete({
            where: { id: id },
        });
        return deletedUser;
    }
}

export const userService = new UserService();
