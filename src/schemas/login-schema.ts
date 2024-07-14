import { z } from 'zod';

export const loginSchema = z
    .object({
        email: z.string().email({ message: 'Неверный набран email' }),
        password: z.string().min(1, { message: 'Введите пароль' }),
    })
    .required({
        email: true,
        password: true,
    });
//extract the inferred type from schema
export type ValidationLoginSchemaType = z.infer<typeof loginSchema>;
