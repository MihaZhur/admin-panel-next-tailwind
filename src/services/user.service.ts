import prisma from '@/lib/db';
import { ValidationUserSchemaType } from '@/schemas/user-schema';
import { PrismaClient, User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { mailService } from './mail.service';
import { hash } from 'bcryptjs';
class UserService {
    LIMIT_ITEMS_PAGE = 10;
    userUserAction: any;
    constructor(private readonly prismaClient: PrismaClient) {}

    async getUserById(id: number) {
        const user = await this.prismaClient.user.findUnique({
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
        const user = await this.prismaClient.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }

    async getUserByCodePasswordRefresh(refreshPassword: string) {
        const user = await this.prismaClient.user.findFirst({
            where: { refresh_password: refreshPassword },
        });

        return user;
    }
    async getUserByCodeActivation(code_activated: string) {
        const user = await this.prismaClient.user.findFirst({
            where: { code_activated },
        });

        return user;
    }
    async updateCode(userId: number) {
        await this.prismaClient.user.update({
            where: { id: userId },
            data: {
                activated: true,
                code_activated: null,
            },
        });
        return true;
    }

    async updatePassword(refresh_password: User['refresh_password'], newPassword: string) {
        try {
            const candidate = await this.prismaClient.user.findFirst({
                where: { refresh_password },
            });

            if (!candidate) {
                return notFound();
            }
            await this.prismaClient.user.update({
                where: { id: candidate.id },
                data: {
                    refresh_password: null,
                    password: newPassword,
                },
            });
            return true;
        } catch (error: any) {
            console.error('Ошибка при обновлении пароля:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при обновлении пароля');
        }
    }

    async getUsers({ currentPage }: { currentPage: number }) {
        try {
            const skip = (currentPage - 1) * this.LIMIT_ITEMS_PAGE;
            const users = await this.prismaClient.user.findMany({
                skip: skip,
                take: this.LIMIT_ITEMS_PAGE,
                where: {
                    role: {
                        not: 'ADMIN',
                    },
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    activated: true,
                },
            });

            const total = await this.prismaClient.user.count({
                where: {
                    role: {
                        not: 'ADMIN',
                    },
                },
            });

            const totalPages = Math.ceil(total / this.LIMIT_ITEMS_PAGE);

            return {
                users,
                totalPages,
                total,
            };
        } catch (error: any) {
            console.error('Ошибка получения пользователей:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка получения пользователей');
        }
    }
    async createUser(data: ValidationUserSchemaType) {
        try {
            const candidate = await this.getUserByEmail(data.email);
            if (candidate) {
                throw new Error('Пользователь с таким email уже существует');
            }
            if (data.role === 'ADMIN') {
                throw new Error('Администратор может быть только один');
            }
            const newUser = await this.prismaClient.user.create({
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
            const candidate = await this.getUserById(id);
            if (!candidate) {
                throw new Error('Пользователь не найден');
            }
            if (candidate.role === 'ADMIN' && data.role !== 'ADMIN') {
                throw new Error('Нельзя изменить роль администратора');
            }
            const updatedUser = await this.prismaClient.user.update({
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
        try {
            const candidate = await this.getUserById(id);
            if (!candidate) {
                throw new Error('Пользователь не найден');
            }

            if (candidate.role === 'ADMIN') {
                throw new Error('Нельзя удалить администратора');
            }

            const deletedUser = await this.prismaClient.user.delete({
                where: { id: id },
            });
            return deletedUser;
        } catch (error: any) {
            console.error('Ошибка при удалении пользователя:', error);
            const message = error.message;
            throw new Error(message);
        }
    }

    async resetPassword(email: string) {
        try {
            const candidate = await this.getUserByEmail(email);
            if (!candidate) {
                throw new Error('Пользователь не найден');
            }
            const token = uuidv4();
            await mailService.sendResetPasswordMail(email, candidate.name ?? '', token);
            await this.prismaClient.user.update({
                where: { id: candidate.id },
                data: {
                    refresh_password: token,
                },
            });
            return token;
        } catch (error: any) {
            console.error('Ошибка при обновлении пароля:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при обновлении пароля');
        }
    }
    async refreshPassword(refreshCode: string, newPassword: string) {
        try {
            const candidate = await this.getUserByCodePasswordRefresh(refreshCode);
            if (!candidate) {
                throw new Error('Пользователь не найден');
            }
            await this.prismaClient.user.update({
                where: { id: candidate.id },
                data: {
                    refresh_password: null,
                    password: await hash(newPassword, Number(process.env.SALT_HASH)),
                },
            });
            return { message: 'Пароль успешно обновлен', status: 'success' };
        } catch (error: any) {
            console.error('Ошибка при обновлении пароля:', error);
            const message = error.message;
            throw new Error(message ? message : 'Ошибка при обновлении пароля');
        }
    }
}

export const userService = new UserService(prisma);
