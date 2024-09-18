import { z } from 'zod';
export const categoryPostSchema = z.object({
    name: z.string().min(2, { message: 'Слишком короткое название категории' }),
    // preview: z.string().optional(),
});

export type ValidationCategoryPostSchemaType = z.infer<typeof categoryPostSchema>;
