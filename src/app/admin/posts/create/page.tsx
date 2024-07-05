import { GoBack } from '@/components';
import { FormPost } from '../../components';
import { cretePostAction } from './action';

export default function Create() {
    return (
        <>
            <GoBack />
            <FormPost
                action={cretePostAction}
                btnText="Создать"
                btnTextLoading="Создается"
            />
        </>
    );
}
