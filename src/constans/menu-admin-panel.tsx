import {
    BookOpenIcon,
    CogIcon,
    EnvelopeIcon,
    Squares2X2Icon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/20/solid';
import { routes } from './routes';
export const menuGroups = [
    {
        name: 'Меню',
        menuItems: [
            {
                icon: (
                    <Squares2X2Icon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Дашборд',
                route: '/admin',
            },
            {
                icon: (
                    <BookOpenIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Блог',
                route: '#',
                children: [
                    { label: 'Категории', route: routes.adminCategoriesPost },
                    { label: 'Статьи блога', route: routes.adminPosts },
                ],
            },
            {
                icon: (
                    <UserGroupIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Пользователи',
                route: routes.adminUsers,
                private: ['ADMIN'],
            },
            {
                icon: (
                    <EnvelopeIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Почта',
                route: '#',
                children: [
                    { label: 'Настройки почты', route: routes.adminMailSettings },
                    { label: 'Заявки', route: routes.adminMailApplication },
                ],
            },
            {
                icon: (
                    <UserIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Профиль',
                route: routes.adminProfile,
            },
            {
                icon: (
                    <CogIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Настройки',
                route: routes.adminSettings,
            },
        ],
    },
];
