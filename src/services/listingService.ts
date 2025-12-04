import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";
import { ApiResponse, Listing, CreateListingData, ListingFilters, PaginationMeta } from "@/types";

export const listingService = {
  getListings: async (filters?: ListingFilters): Promise<ApiResponse<Listing[]> & { meta?: { pagination: PaginationMeta } }> => {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await axiosInstance.get(`${API_ENDPOINTS.LISTINGS.BASE}${query}`);
    return response.data;
  },

  getListingById: async (id: string): Promise<ApiResponse<Listing>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.LISTINGS.BY_ID(id));
    return response.data;
  },

  getMyListings: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Listing[]> & { meta?: { pagination: PaginationMeta } }> => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.LISTINGS.MY_LISTINGS}?page=${page}&limit=${limit}`);
    return response.data;
  },

  createListing: async (data: CreateListingData): Promise<ApiResponse<Listing>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.LISTINGS.BASE, data);
    return response.data;
  },

  updateListing: async (id: string, data: Partial<CreateListingData & { isActive?: boolean }>): Promise<ApiResponse<Listing>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.LISTINGS.BY_ID(id), data);
    return response.data;
  },

  deleteListing: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.LISTINGS.BY_ID(id));
    return response.data;
  },
};