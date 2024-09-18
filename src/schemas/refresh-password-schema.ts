import { z } from 'zod';

export const refreshPasswordSchema = z
    .object({
        password: z.string().min(6, { message: 'Минимальное количество сиволов 6' }),
        password_conformition: z.string(),
    })
    .refine((data) => data.password === data.password_conformition, {
        message: 'Пароли не совпадают',
        path: ['password_conformition'],
    });
//extract the inferred type from schema
export type ValidationRefreshPasswordSchemaType = z.infer<typeof refreshPasswordSchema>;
