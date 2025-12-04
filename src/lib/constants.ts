// App Info
export const APP_NAME = "Cuddley";
export const APP_DESCRIPTION = "Connect with local guides for authentic experiences";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    CHANGE_PASSWORD: "/auth/change-password",
  },
  USERS: {
    BASE: "/users",
    GUIDES: "/users/guides",
    BY_ID: (id: string) => `/users/${id}`,
    STATUS: (id: string) => `/users/${id}/status`,
  },
  LISTINGS: {
    BASE: "/listings",
    BY_ID: (id: string) => `/listings/${id}`,
    MY_LISTINGS: "/listings/my/listings",
  },
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id: string) => `/bookings/${id}`,
    STATUS: (id: string) => `/bookings/${id}/status`,
    COMPLETE: (id: string) => `/bookings/${id}/complete`,
    STATS: "/bookings/stats",
  },
  REVIEWS: {
    BASE: "/reviews",
    BY_ID: (id: string) => `/reviews/${id}`,
    MY_REVIEWS: "/reviews/my/reviews",
    GUIDE: (guideId: string) => `/reviews/guide/${guideId}`,
  },
  PAYMENTS: {
    BASE: "/payments",
    BY_ID: (id: string) => `/payments/${id}`,
    CREATE_INTENT: "/payments/create-payment-intent",
    CREATE_CHECKOUT: "/payments/create-checkout-session",
    CONFIRM: "/payments/confirm",
    REFUND: (id: string) => `/payments/${id}/refund`,
    STATS: "/payments/stats",
  },
  DASHBOARD: {
    BASE: "/dashboard",
    ADMIN: "/dashboard/admin",
    GUIDE: "/dashboard/guide",
    TOURIST: "/dashboard/tourist",
  },
  UPLOADS: {
    SINGLE: "/uploads/single",
    MULTIPLE: "/uploads/multiple",
    DELETE: "/uploads",
  },
};

// Tour Categories with Lucide Icon Names (as strings)
export const TOUR_CATEGORIES = [
  { 
    value: "Food", 
    label: "Food & Culinary", 
    icon: "UtensilsCrossed" 
  },
  { 
    value: "History", 
    label: "History & Culture", 
    icon: "Building2" 
  },
  { 
    value: "Art", 
    label: "Art & Museums", 
    icon: "Palette" 
  },
  { 
    value: "Adventure", 
    label: "Adventure", 
    icon: "Mountain" 
  },
  { 
    value: "Nature", 
    label: "Nature & Wildlife", 
    icon: "Leaf" 
  },
  { 
    value: "Nightlife", 
    label: "Nightlife", 
    icon: "Music" 
  },
  { 
    value: "Photography", 
    label: "Photography", 
    icon: "Camera" 
  },
  { 
    value: "Walking", 
    label: "Walking Tours", 
    icon: "Footprints" 
  },
  { 
    value: "Music", 
    label: "Music & Entertainment", 
    icon: "Music2" 
  },
  { 
    value: "Shopping", 
    label: "Shopping", 
    icon: "ShoppingBag" 
  },
];

// Languages
export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Russian",
];

// Popular Cities
export const POPULAR_CITIES = [
  { 
    name: "Paris", 
    country: "France", 
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800" 
  },
  { 
    name: "Tokyo", 
    country: "Japan", 
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800" 
  },
  { 
    name: "Rome", 
    country: "Italy", 
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800" 
  },
  { 
    name: "Kyoto", 
    country: "Japan", 
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800" 
  },
];

// Expertise Areas
export const EXPERTISE_AREAS = [
  "History",
  "Food",
  "Art",
  "Architecture",
  "Nature",
  "Adventure",
  "Photography",
  "Nightlife",
  "Shopping",
  "Local Culture",
];