import { BodyPage, FormUser, GoBack } from '@/components';
import { createUserAction } from './action';

export default async function CreateUser() {
    return (
        <>
            <BodyPage>
                <GoBack />
                <FormUser
                    type="create"
                    action={createUserAction}
                />
            </BodyPage>
        </>
    );
}
