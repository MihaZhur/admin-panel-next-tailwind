import { Role } from '@prisma/client';
import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(2, { message: 'Слишком короткое имя' }),
    email: z.string().email({ message: 'Неверный набран email' }),
    activated: z.boolean(),
    role: z.enum([Role.ADMIN, Role.USER, Role.MANAGER] as const, { message: 'Выбере роль пользователя' }),
});

export type ValidationUserSchemaType = z.infer<typeof userSchema>;
