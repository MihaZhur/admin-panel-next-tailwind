import { FormRefreshPassword } from '@/components';
import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';

export default async function ActivationPage(request: { params: { code_refresh: string } }) {
    const user = await userService.getUserByCodePasswordRefresh(request.params.code_refresh);

    if (!user) {
        return notFound();
    }

    return (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <FormRefreshPassword refreshCode={request.params.code_refresh} />
        </div>
    );
}
