// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api'

// App Constants
export const APP_NAME = 'Home Maintenance'
export const APP_VERSION = '1.0.0'

// Roles
export const ROLES = {
  USER: 'user',
  PROVIDER: 'provider',
  ADMIN: 'admin',
}

// Booking Statuses
export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

// Provider Statuses
export const PROVIDER_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  BLOCKED: 'blocked',
}

// Review Constants
export const REVIEW = {
  MIN_RATING: 1,
  MAX_RATING: 5,
}

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 50

// Date Format
export const DATE_FORMAT = 'yyyy-MM-dd'
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  REGISTER_SUCCESS: 'Successfully registered!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  BOOKING_SUCCESS: 'Booking created successfully!',
  REVIEW_SUCCESS: 'Review submitted successfully!',
}