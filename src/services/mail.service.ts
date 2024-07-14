import { transporter } from '@/configs/nodemailer';

class MailService {
    private transporter;

    constructor() {
        this.transporter = transporter;
    }

    async sendActivationMail(email: string, name: string, activationLink: string) {
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_MAILER_USER,
            to: email,
            replyTo: email,
            subject: 'Активация аккаунта',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Здравствуйте, ${name}</h2>
                    <p>Спасибо за регистрацию. Пожалуйста, нажмите на ссылку ниже, чтобы активировать ваш аккаунт:</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL + activationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Активировать аккаунт</a>
                    <p>Если вы не регистрировались на нашем сайте, пожалуйста, проигнорируйте это письмо.</p>
                </div>
            `,
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendResetPasswordMail(email: string, name: string, resetLink: string) {
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_MAILER_USER,
            to: email,
            replyTo: email,
            subject: 'Запрос на сброс пароля',
            text: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Здравствуйте, ${name}</h2>
                    <p>Мы получили запрос на сброс вашего пароля. Пожалуйста, нажмите на ссылку ниже, чтобы сбросить ваш пароль:</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL + resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Сбросить пароль</a>
                    <p>Если вы не запрашивали сброс пароля, пожалуйста, проигнорируйте это письмо.</p>
                </div>
            `,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

export const mailService = new MailService();
