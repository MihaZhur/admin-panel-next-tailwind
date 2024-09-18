import { z } from 'zod';

export const resetPasswordSchema = z.object({
    email: z.string().email({ message: 'Неверный набран email' }),
});
//extract the inferred type from schema
export type ValidationResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
