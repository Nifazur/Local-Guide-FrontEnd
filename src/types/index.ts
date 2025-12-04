// ============ Common Types ============
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    pagination?: PaginationMeta;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

// ============ User Types ============
export type UserRole = "TOURIST" | "GUIDE" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  profilePic?: string | null;
  bio?: string | null;
  languages: string[];
  phone?: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  expertise: string[];
  dailyRate?: number | null;
  city?: string | null;
  country?: string | null;
  travelPreferences: string[];
  averageRating?: number;
  _count?: {
    listings?: number;
    bookingsAsTourist?: number;
    bookingsAsGuide?: number;
    reviewsReceived?: number;
  };
}

export interface GuideProfile extends User {
  listings?: Listing[];
  reviewsReceived?: Review[];
}

// ============ Auth Types ============
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "TOURIST" | "GUIDE";
  phone?: string;
  languages?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============ Listing Types ============
export interface Listing {
  id: string;
  title: string;
  description: string;
  itinerary?: string | null;
  tourFee: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  images: string[];
  city: string;
  country: string;
  category: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  guideId: string;
  guide?: Partial<User>;
  averageRating?: number;
  _count?: {
    reviews: number;
    bookings: number;
  };
  reviews?: Review[];
}

export interface CreateListingData {
  title: string;
  description: string;
  itinerary?: string;
  tourFee: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  city: string;
  country: string;
  category: string[];
  images?: string[];
}

export interface ListingFilters {
  page?: number;
  limit?: number;
  city?: string;
  country?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  search?: string;
  guideId?: string;
  sortBy?: "price" | "rating" | "newest";
  [key: string]: unknown;
}

// ============ Booking Types ============
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime?: string | null;
  numberOfPeople: number;
  totalAmount: number;
  status: BookingStatus;
  specialRequests?: string | null;
  createdAt: string;
  updatedAt: string;
  touristId: string;
  guideId: string;
  listingId: string;
  listing?: Partial<Listing>;
  guide?: Partial<User>;
  tourist?: Partial<User>;
  payment?: Payment | null;
  review?: Review | null;
}

export interface CreateBookingData {
  listingId: string;
  bookingDate: string;
  startTime: string;
  numberOfPeople: number;
  specialRequests?: string;
}

export interface BookingFilters {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  startDate?: string;
  endDate?: string;
  [key: string]: unknown;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  totalEarnings: number;
}

// ============ Review Types ============
export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  touristId: string;
  guideId: string;
  listingId: string;
  bookingId: string;
  tourist?: Partial<User>;
  guide?: Partial<User>;
  listing?: Partial<Listing>;
}

export interface CreateReviewData {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface ReviewFilters {
  page?: number;
  limit?: number;
  guideId?: string;
  listingId?: string;
  rating?: number;
  [key: string]: unknown;
}

// ============ Payment Types ============
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentId?: string | null;
  stripeSessionId?: string | null;
  paymentMethod?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  bookingId: string;
  booking?: Partial<Booking>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  payment: Payment;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

// ============ Dashboard Types ============
export interface AdminDashboard {
  stats: {
    totalUsers: number;
    totalGuides: number;
    totalTourists: number;
    totalListings: number;
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    totalRevenue: number;
  };
  recentBookings: Booking[];
  recentUsers: User[];
  topGuides: User[];
}

export interface GuideDashboard {
  stats: {
    totalListings: number;
    activeListings: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    totalEarnings: number;
    totalReviews: number;
    averageRating: number;
  };
  upcomingBookings: Booking[];
  recentReviews: Review[];
}

export interface TouristDashboard {
  stats: {
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    totalSpent: number;
    reviewsGiven: number;
  };
  upcomingTrips: Booking[];
  pastTrips: Booking[];
}

// ============ Upload Types ============
export interface UploadResult {
  url: string;
  publicId: string;
}