import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";
import { ApiResponse, User, GuideProfile, PaginationMeta } from "@/types";

interface GuideFilters {
  page?: number;
  limit?: number;
  city?: string;
  country?: string;
  language?: string;
  expertise?: string;
  minRate?: number;
  maxRate?: number;
  search?: string;
  [key: string]: unknown;
}

export const userService = {
  getUsers: async (filters?: GuideFilters): Promise<ApiResponse<User[]> & { meta?: { pagination: PaginationMeta } }> => {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS.BASE}${query}`);
    return response.data;
  },

  getGuides: async (filters?: GuideFilters): Promise<ApiResponse<GuideProfile[]> & { meta?: { pagination: PaginationMeta } }> => {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS.GUIDES}${query}`);
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<GuideProfile>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.USERS.BY_ID(id), data);
    return response.data;
  },

  updateUserStatus: async (id: string, isActive: boolean): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.USERS.STATUS(id), { isActive });
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },
};