// src/context/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { bookingService } from '../services/bookingService'

const BookingContext = createContext(null)

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await bookingService.getMyBookings()
      setBookings(response.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load bookings')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData) => {
    try {
      const response = await bookingService.create(bookingData)
      await loadBookings() // Refresh list
      return response
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create booking')
    }
  }

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await bookingService.updateStatus(id, status)
      await loadBookings() // Refresh list
      return response
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update booking status')
    }
  }

  const completeBooking = async (id) => {
    try {
      const response = await bookingService.complete(id)
      await loadBookings() // Refresh list
      return response
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to complete booking')
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        loadBookings,
        createBooking,
        updateBookingStatus,
        completeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBookings = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider')
  }
  return context
}