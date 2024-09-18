export const validateFile = (file: File) => {
    const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedExtensions.includes(file.type)) {
        throw new Error('Недопустимый формат файла. Допустимые форматы: jpg, jpeg, png, webp');
    }
    const MAX_SIZE_MB = 3;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
        throw new Error('Размер файла превышает 3 МБ');
    }
    return true;
};
