import { Role } from '@prisma/client';

export const rolesMap = {
    [Role.ADMIN]: 'Администратор',
    [Role.USER]: 'Пользователь',
    [Role.MANAGER]: 'Менеджер',
} as const;
