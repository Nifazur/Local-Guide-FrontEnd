import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";
import { ApiResponse, Payment, PaymentIntentResponse, CheckoutSessionResponse, PaginationMeta } from "@/types";

interface PaymentFilters {
    page?: number;
    limit?: number;
    status?: string;
    [key: string]: unknown;
}

export const paymentService = {
    createPaymentIntent: async (bookingId: string): Promise<ApiResponse<PaymentIntentResponse>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CREATE_INTENT, { bookingId });
        return response.data;
    },

    createCheckoutSession: async (bookingId: string): Promise<ApiResponse<CheckoutSessionResponse>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CREATE_CHECKOUT, { bookingId });
        return response.data;
    },

    confirmPayment: async (bookingId: string, paymentIntentId: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CONFIRM, { bookingId, paymentIntentId });
        return response.data;
    },

    getPayments: async (filters?: PaymentFilters): Promise<ApiResponse<Payment[]> & { meta?: { pagination: PaginationMeta } }> => {
        const query = filters ? `?${buildQueryString(filters)}` : "";
        const response = await axiosInstance.get(`${API_ENDPOINTS.PAYMENTS.BASE}${query}`);
        return response.data;
    },
    getPaymentStats: async (): Promise<ApiResponse<{
        totalRevenue: number;
        paid: number;
        pending: number;
        refunded: number;
    }>> => {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.STATS);
        return response.data;
    },

  getPaymentById: async (id: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.BY_ID(id));
        return response.data;
    },

    refundPayment: async (id: string, reason?: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.REFUND(id), { reason });
        return response.data;
    },
};