import { BookOpenIcon, Squares2X2Icon, UserGroupIcon, UserIcon } from '@heroicons/react/20/solid';

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
                    { label: 'Категории', route: '/' },
                    { label: 'Статьи блога', route: '/admin/posts' },
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
                route: '/admin/users',
            },
            {
                icon: (
                    <UserIcon
                        width={18}
                        height={18}
                    />
                ),
                label: 'Профиль',
                route: '/profile',
            },
            {
                icon: '',
                label: 'Формы',
                route: '#',
                children: [
                    { label: 'Form Elements', route: '/forms/form-elements' },
                    { label: 'Form Layout', route: '/forms/form-layout' },
                ],
            },
            {
                icon: '',
                label: 'Tables',
                route: '/tables',
            },
            {
                icon: '',
                label: 'Настройки',
                route: '/settings',
            },
        ],
    },
];
