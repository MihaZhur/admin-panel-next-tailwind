import { postApi } from '@/api/';
import { showToast } from '@/utils/show-toast';
import { useMutation } from '@tanstack/react-query';

export const useDeletePost = () => {
    return useMutation({
        mutationFn: (id: string | number) => postApi.deleteById(id),
        onSuccess: () => {
            showToast('success', 'Пост успешно удален!');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message;
            console.error(error);
            showToast('error', message);
        },
    });
};
