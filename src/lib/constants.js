const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export const API_ENDPOINTS = {
  LOGIN: `${BASE}/api/auth/callback/credentials`, //
  REGISTER: `${BASE}/api/auth/register`, //


  // Product Endpoints
  PRODUCTS: "/api/products",
  SINGLE_PRODUCT: (id) => `/api/products/${id}`, // Dynamic ID ke liye function
  CATEGORIES: "/api/categories",
  ADDED_TO_CART: "/api/cart",
  CHECKOUT:"/api/checkout",

  // Admin Dashboard Endpoints
  DASHBOARD_STATS: "/api/dashboard/stats",
  USERS: "/api/dashboard/users",
  ORDERS: "/api/dashboard/orders",
};
