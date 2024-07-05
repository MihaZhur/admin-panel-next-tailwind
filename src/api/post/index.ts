import { type Post } from './types';
import { HttpClient } from '@/services/http-client.service';

class PostApi {
    async getAll(): Promise<Post[]> {
        const response = await HttpClient.get<Post[]>('/posts/');
        return response.data;
    }
    async getById(id: string): Promise<Post> {
        const response = await HttpClient.get<Post>(`/posts/${id}`);
        return response.data;
    }
    async updateById(id: string, updatedPost: Post) {
        const response = await HttpClient.patch<Post>(`/posts/${id}`, updatedPost);
        return response.data;
    }

    async deleteById(id: string | number) {
        const response = await HttpClient.delete(`/posts/${id}`);
        return response.data;
    }
}

export const postApi = new PostApi();
