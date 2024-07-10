'use server';

import { transporter } from '@/configs/nodemailer';
import prisma from '@/lib/db';
import { ValidationRegistrationSchemaType } from '@/schemas/registration-schema';
import { mailService } from '@/services/mail.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

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
        type OmitUserCreate = Omit<User, 'id' | 'role' | 'activated' | 'code_activated' | 'refresh_password'>;
        const userDataHash: OmitUserCreate = {
            email,
            name,
            password: await hash(password, Number(process.env.NEXT_PUBLIC_SALT_HASH)),
        };

        await mailService.sendActivationMail(userDataHash.email, userDataHash.name!, 'testUrls');

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
