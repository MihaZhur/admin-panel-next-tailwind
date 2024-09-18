'use server';
import { RateLimitService } from '@/services/rate-limit.service';
import { signIn } from 'next-auth/react';
import { headers } from 'next/headers';

const rateLimitService = new RateLimitService({
    windowStart: Date.now(),
    windowSize: 15 * 60 * 1000,
    maxRequests: 5,
});
export const rateLimitValidateAction = async () => {
    try {
        const ip = headers().get('x-forwarded-for') ?? 'unknown';
        const isRateLimited = rateLimitService.rateLimit(ip);
        if (isRateLimited) {
            throw new Error('Превышен лимит запросов. Пожалуйста, повторите позже.');
        }
        return true;
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        throw new Error(message ? message : 'Неизвестная ошибка');
    }
};
