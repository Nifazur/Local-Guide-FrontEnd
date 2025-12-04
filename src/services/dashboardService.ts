import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse, AdminDashboard, GuideDashboard, TouristDashboard } from "@/types";

export const dashboardService = {
  getDashboard: async (): Promise<ApiResponse<AdminDashboard | GuideDashboard | TouristDashboard>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.BASE);
    return response.data;
  },

  getAdminDashboard: async (): Promise<ApiResponse<AdminDashboard>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.ADMIN);
    return response.data;
  },

  getGuideDashboard: async (): Promise<ApiResponse<GuideDashboard>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.GUIDE);
    return response.data;
  },

  getTouristDashboard: async (): Promise<ApiResponse<TouristDashboard>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.TOURIST);
    return response.data;
  },
};