import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/constans/routes';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { SignOutButton } from '@/components/';

export const HeaderSite = async () => {
    const session = await getServerSession(authConfig);
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                className="flex items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link
                        href="#"
                        className="-m-1.5 p-1.5"
                    >
                        <span className="sr-only">Your Company</span>
                        <Image
                            width={100}
                            height={70}
                            className="h-8 w-auto"
                            src={'/default/logo.png'}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link
                        href={routes.main}
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Главная
                    </Link>
                    <Link
                        href={routes.admin}
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Админ панель
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!session?.user ? (
                        <Link
                            href={routes.signIn}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Авторизация <span aria-hidden="true">&rarr;</span>
                        </Link>
                    ) : (
                        <SignOutButton variant="bordered" />
                    )}
                </div>
            </nav>
            <div
                className="lg:hidden"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 z-50"></div>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link
                            href="#"
                            className="-m-1.5 p-1.5"
                        >
                            <span className="sr-only">Your Company</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href={routes.main}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Главная
                                </Link>
                            </div>
                            <div className="space-y-2 py-6">
                                <Link
                                    href={routes.admin}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Админ панель
                                </Link>
                            </div>
                            <div className="py-6">
                                {!session?.user ? (
                                    <Link
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Авторизация
                                    </Link>
                                ) : (
                                    <SignOutButton variant="bordered" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
