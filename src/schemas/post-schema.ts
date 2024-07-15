import { z } from 'zod';
export const postSchema = z.object({
    title: z.string().min(2, { message: 'Слишком короткое название поста' }),
    content: z.string(),
    published: z.boolean(),
    categories: z.array(z.string()).optional(),
});

export type ValidationPostSchemaType = z.infer<typeof postSchema>;
