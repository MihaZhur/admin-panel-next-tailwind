// import { writeFile, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import { extname, join } from 'path';

export class UploadService {
    async uploadFile(file?: File, typePath: 'posts' | 'avatar' | 'category-post' = 'posts') {
        try {
            if (!file) {
                throw new Error('Файл отсутствует');
            }
            // Проверка размера файла (не более 3 МБ)
            const MAX_SIZE_MB = 3;
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
            if (file.size > MAX_SIZE_BYTES) {
                throw new Error('Размер файла превышает 3 МБ');
            }

            // Получаем оригинальное расширение файла
            const extension = extname(file.name).toLowerCase();
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
            if (!allowedExtensions.includes(extension)) {
                throw new Error('Недопустимый формат файла. Допустимые форматы: jpg, jpeg, png, webp');
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            // Генерируем уникальное имя файла

            const uniqueFilename = `${uuidv4()}${extension}`;

            // Определяем путь к папке public/upload/type
            const publicDir = join(process.cwd(), 'public');
            const uploadDir = join(publicDir, 'upload', typePath);
            const filePath = join(uploadDir, uniqueFilename);
            try {
                await fs.access(uploadDir);
            } catch (error) {
                await fs.mkdir(uploadDir, { recursive: true });
            }

            await fs.writeFile(filePath, buffer);

            return `upload/${typePath}/${uniqueFilename}`;
        } catch (e: any) {
            console.error(e);
            throw new Error('Ошибка загрузки файла');
        }
    }

    async deleteFile(filePath: string) {
        try {
            const fullPath = join(process.cwd(), 'public', filePath);
            await fs.unlink(fullPath);
            console.log(`Файл ${fullPath} успешно удален`);
            return true;
        } catch (error) {
            console.error(`Ошибка при удалении файла ${filePath}:`, error);
        }
    }
}

export const uploadService = new UploadService();
