import { postApi } from '@/api/';
import { useQuery } from '@tanstack/react-query';

export const useGetPost = (id: string) => {
  return useQuery({
    queryFn: () => postApi.getById(id),
    queryKey: ['post', id],
  });
};
