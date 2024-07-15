// 'use server';
// import { ValidationCategoryPostSchemaType } from '@/schemas/category-post-schema';
// import { categoryPostService } from '@/services/category-post.service';

// export const updateCategoryPostAction = async (
//     categoryId: number,
//     updateCategoryData: ValidationCategoryPostSchemaType,
// ) => {
//     try {
//         const postData = await categoryPostService.updateCategory(categoryId, updateCategoryData.name);
//         return { message: 'Категоря успешно создана!', postData };
//     } catch (error: any) {
//         console.log(error);
//         const message = error.message;
//         return message ? message : 'Неизвестная ошибка';
//     }
// };
