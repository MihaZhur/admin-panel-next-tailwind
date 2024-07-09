import nodemailer, { type TransportOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportOptions = {
    host: process.env.NEXT_PUBLIC_MAILER_HOST,
    port: process.env.NEXT_PUBLIC_MAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_MAILER_USER,
        pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD,
    },
} as SMTPTransport.Options;

export const transporter = nodemailer.createTransport(transportOptions);
