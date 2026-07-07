import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },

    addBooking: (state, action) => {
      state.bookings.unshift(action.payload);
    },

    updateBooking: (state, action) => {
      state.bookings = state.bookings.map((b) =>
        b._id === action.payload._id ? action.payload : b
      );

      if (
        state.selectedBooking?._id === action.payload._id
      ) {
        state.selectedBooking = action.payload;
      }
    },

    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (b) => b._id !== action.payload
      );

      if (
        state.selectedBooking?._id === action.payload
      ) {
        state.selectedBooking = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setBookings,
  setSelectedBooking,
  addBooking,
  updateBooking,
  removeBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;