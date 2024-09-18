import { BodyPage, FormUser, GoBack } from '@/components';
import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';
import { userUserAction } from './action';

export default async function EditUser({ params }: { params: { id: string } }) {
    if (Number.isNaN(+params.id)) {
        notFound();
    }
    const user = await userService.getUserById(+params.id);

    return (
        <>
            <BodyPage>
                <GoBack />
                <FormUser
                    action={userUserAction.bind(null, +params.id)}
                    initialValues={{
                        email: user?.email,
                        name: user.name ?? '',
                        activated: user?.activated,
                        role: user?.role,
                    }}
                    type="update"
                />
            </BodyPage>
        </>
    );
}
