'use server';

import { routes } from '@/constans/routes';
import prisma from '@/lib/db';
import { ValidationRegistrationSchemaType } from '@/schemas/registration-schema';
import { mailService } from '@/services/mail.service';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
class CustomError extends Error {
    statusCode: number;
    constructor(message: string | undefined, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

const LENGTH_PASSORD = 6;

export const registrationUser = async (data: ValidationRegistrationSchemaType) => {
    try {
        const candidate = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (candidate) {
            throw new CustomError('Пользователь уже зарегистрирован', 400);
        }
        if (data.password !== data.password_conformition) {
            throw new CustomError('Пароли не совпадают', 400);
        }
        if (data.password.length < LENGTH_PASSORD) {
            throw new CustomError('Слишком короткий пароль', 400);
        }
        const { password, email, name } = data;
        interface UserCreate {
            email: string;
            name: string | null;
            password: string | null;
            activated: boolean;
            code_activated: string | null;
        }

        const hashCode = uuidv4();

        const userDataHash: UserCreate = {
            email,
            name,
            password: await hash(password, Number(process.env.NEXT_PUBLIC_SALT_HASH)),
            code_activated: hashCode,
            activated: false,
        };

        const activatedLink = routes.activated + hashCode;

        await mailService.sendActivationMail(userDataHash.email, userDataHash.name!, activatedLink);

        await prisma.user.create({
            data: userDataHash,
        });

        // Logic send Mail

        return { message: 'Вам на почту отправлено сообщение об активации аккаунта', status: 200 };
    } catch (error: any) {
        if (error instanceof CustomError) {
            return { message: error.message, status: error.statusCode };
        }
        return { message: 'Произошла ошибка на сервере', status: 500 };
    }
};
