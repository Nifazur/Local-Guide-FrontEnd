import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse, UploadResult } from "@/types";

export const uploadService = {
  uploadSingle: async (file: File): Promise<ApiResponse<UploadResult>> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post(API_ENDPOINTS.UPLOADS.SINGLE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  uploadMultiple: async (files: File[]): Promise<ApiResponse<UploadResult[]>> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const response = await axiosInstance.post(API_ENDPOINTS.UPLOADS.MULTIPLE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteImage: async (publicId: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.UPLOADS.DELETE, {
      data: { publicId },
    });
    return response.data;
  },
};