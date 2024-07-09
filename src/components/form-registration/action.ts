'use server';

import { transporter } from '@/configs/nodemailer';
import prisma from '@/lib/db';
import { ValidationRegistrationSchemaType } from '@/schemas/registration-schema';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

const LENGTH_PASSORD = 6;

export const registrationUser = async (data: ValidationRegistrationSchemaType) => {
    try {
        const candidate = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (candidate) {
            throw new Error('Пользователь уже зарегистрирован');
        }
        if (data.password !== data.password_conformition) {
            throw new Error('Пароли не совпадают');
        }
        if (data.password.length < LENGTH_PASSORD) {
            throw new Error('Слишком короткий пароль');
        }
        const { password, email, name } = data;
        type OmitUserCreate = Omit<User, 'id' | 'role' | 'activated' | 'code_activated' | 'refresh_password'>;
        const userDataHash: OmitUserCreate = {
            email,
            name,
            password: await hash(password, Number(process.env.NEXT_PUBLIC_SALT_HASH)),
        };

        await prisma.user.create({
            data: userDataHash,
        });

        // Logic send Mail

        const mail = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_MAILER_USER,
            to: userDataHash.email,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: Подтверждение почты</p>
            `,
        });

        return NextResponse.json({ message: 'Вам на почту отправлено сообщение об активации аккаунта' });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
