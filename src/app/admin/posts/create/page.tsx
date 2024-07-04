import { FormPost } from '../../components';
import { cretePostAction } from './action';

export default function Create() {
    return <FormPost action={cretePostAction} />;
}
