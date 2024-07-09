import { z } from 'zod';

export const registationSchema = z
    .object({
        name: z.string().min(2, { message: 'Имя слишком короткое' }),
        email: z.string().email({ message: 'Неверный набран email' }),
        password: z.string().min(6, { message: 'Минимальное количество сиволов 6' }),
        password_conformition: z.string(),
    })
    .refine((data) => data.password === data.password_conformition, {
        message: 'Пароли не совпадают',
        path: ['password_conformition'],
    });
//extract the inferred type from schema
export type ValidationRegistrationSchemaType = z.infer<typeof registationSchema>;
