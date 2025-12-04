import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";
import { ApiResponse, Review, CreateReviewData, ReviewFilters, PaginationMeta } from "@/types";

export const reviewService = {
  getReviews: async (filters?: ReviewFilters): Promise<ApiResponse<Review[]> & { meta?: { pagination: PaginationMeta } }> => {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await axiosInstance.get(`${API_ENDPOINTS.REVIEWS.BASE}${query}`);
    return response.data;
  },

  getGuideReviews: async (guideId: string, page: number = 1, limit: number = 10): Promise<ApiResponse<Review[]> & { meta?: { pagination: PaginationMeta } }> => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.REVIEWS.GUIDE(guideId)}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getMyReviews: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Review[]> & { meta?: { pagination: PaginationMeta } }> => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.REVIEWS.MY_REVIEWS}?page=${page}&limit=${limit}`);
    return response.data;
  },

  createReview: async (data: CreateReviewData): Promise<ApiResponse<Review>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.REVIEWS.BASE, data);
    return response.data;
  },

  updateReview: async (id: string, data: Partial<CreateReviewData>): Promise<ApiResponse<Review>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.REVIEWS.BY_ID(id), data);
    return response.data;
  },

  deleteReview: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.REVIEWS.BY_ID(id));
    return response.data;
  },
};