import { routes } from '@/constans/routes';
import prisma from '@/lib/db';
import { userService } from '@/services/user.service';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ActivationPage(request: { params: { code_activated: string } }) {
    const user = await userService.getUserByCodeActivation(request.params.code_activated);

    if (!user) {
        return notFound();
    }
    await userService.updateCode(user.id);

    return (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Аккаунт успешно активирован!
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href={routes.signIn}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Авторизоваться
                    </Link>
                    <Link
                        href={'/'}
                        className="text-sm font-semibold text-gray-900"
                    >
                        Перейти на главную <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
