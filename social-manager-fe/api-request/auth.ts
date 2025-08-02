import axiosInstance from '@/utils/axios-instance';
import { useMutation } from '@tanstack/react-query';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: { id: number; email: string };
}
export function useLoginApi() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post<LoginResponse>(
        '/api/auth/login',
        data
      );
      return response.data;
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}
