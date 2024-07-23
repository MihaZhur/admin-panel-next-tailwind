import { z } from 'zod';

export const refreshPasswordSchema = z
    .object({
        email: z.string().email({ message: 'Неверный набран email' }),
    })
    .required({
        email: true,
    });
//extract the inferred type from schema
export type ValidationRefreshPasswordSchemaType = z.infer<typeof refreshPasswordSchema>;
