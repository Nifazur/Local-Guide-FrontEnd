import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";
import { ApiResponse, Booking, CreateBookingData, BookingFilters, BookingStats, PaginationMeta } from "@/types";

export const bookingService = {
  createBooking: async (data: CreateBookingData): Promise<ApiResponse<Booking>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS.BASE, data);
    return response.data;
  },

  getBookings: async (filters?: BookingFilters): Promise<ApiResponse<Booking[]> & { meta?: { pagination: PaginationMeta } }> => {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await axiosInstance.get(`${API_ENDPOINTS.BOOKINGS.BASE}${query}`);
    return response.data;
  },

  getBookingById: async (id: string): Promise<ApiResponse<Booking>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.BOOKINGS.BY_ID(id));
    return response.data;
  },

  updateBookingStatus: async (id: string, status: "CONFIRMED" | "CANCELLED"): Promise<ApiResponse<Booking>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.BOOKINGS.STATUS(id), { status });
    return response.data;
  },

  completeBooking: async (id: string): Promise<ApiResponse<Booking>> => {
    const response = await axiosInstance.patch(API_ENDPOINTS.BOOKINGS.COMPLETE(id));
    return response.data;
  },

  getBookingStats: async (): Promise<ApiResponse<BookingStats>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.BOOKINGS.STATS);
    return response.data;
  },
};