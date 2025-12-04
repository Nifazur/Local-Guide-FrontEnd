import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse, AuthResponse, LoginCredentials, RegisterData, User } from "@/types";

export const authService = {
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};