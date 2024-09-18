'use server';
import { RateLimitService } from '@/services/rate-limit.service';
import { userService } from '@/services/user.service';
import { headers } from 'next/headers';

const rateLimitService = new RateLimitService({
    windowStart: Date.now(),
    windowSize: 15 * 60 * 1000,
    maxRequests: 1,
});

export const resetPasswordAction = async (email: string) => {
    try {
        // Get the IP address of the request
        const ip = headers().get('x-forwarded-for') ?? 'unknown';
        const isRateLimited = rateLimitService.rateLimit(ip);
        if (isRateLimited) {
            return { message: 'Превышен лимит запросов. Пожалуйста, повторите позже.', status: 'error' };
        }
        await userService.resetPassword(email);
        return { message: 'Мы отправили вам письмо для сброса пароля!', status: 'success' };
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        return { message: message ? message : 'Неизвестная ошибка', status: 'error' };
    }
};
