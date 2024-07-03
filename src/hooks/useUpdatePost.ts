import { postApi } from '@/api/';
import { Post } from '@/api/post/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: Post) => postApi.updateById(post.id, post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['consultations'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message;
            console.log(error);
            
        },
    });
};
