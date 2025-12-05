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
    // Create payment intent
    createPaymentIntent: async (bookingId: string): Promise<ApiResponse<PaymentIntentResponse>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CREATE_INTENT, { bookingId });
        return response.data;
    },

    // Create checkout session
    createCheckoutSession: async (bookingId: string): Promise<ApiResponse<CheckoutSessionResponse>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CREATE_CHECKOUT, { bookingId });
        return response.data;
    },

    // Confirm payment
    confirmPayment: async (bookingId: string, paymentIntentId: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.CONFIRM, { bookingId, paymentIntentId });
        return response.data;
    },

    // Get all payments with pagination
    getPayments: async (filters?: PaymentFilters): Promise<ApiResponse<Payment[]> & { meta?: { pagination: PaginationMeta } }> => {
        const query = filters ? `?${buildQueryString(filters)}` : "";
        const response = await axiosInstance.get(`${API_ENDPOINTS.PAYMENTS.BASE}${query}`);
        return response.data;
    },

    // Get payment by ID
    getPaymentById: async (paymentId: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.BY_ID(paymentId));
        return response.data;
    },

    // Get payment by booking ID (NEW METHOD)
    getPaymentByBookingId: async (bookingId: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.get(`/payments/status/${bookingId}`);
        return response.data;
    },

    // Get payment stats
    getPaymentStats: async (): Promise<ApiResponse<{
        totalRevenue: number;
        paid: number;
        pending: number;
        refunded: number;
    }>> => {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.STATS);
        return response.data;
    },

    // Refund payment (admin only)
    refundPayment: async (paymentId: string, reason?: string): Promise<ApiResponse<Payment>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS.REFUND(paymentId), { reason });
        return response.data;
    },
};