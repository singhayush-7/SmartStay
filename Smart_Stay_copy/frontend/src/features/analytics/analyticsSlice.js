import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  revenue: [],
  occupancy: null,
  bookings: [],
  payments: [],
  complaints: null,
  maintenance: null,

  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
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

    setRevenue: (state, action) => {
      state.revenue = action.payload;
    },

    setOccupancy: (state, action) => {
      state.occupancy = action.payload;
    },

    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    setPayments: (state, action) => {
      state.payments = action.payload;
    },

    setComplaints: (state, action) => {
      state.complaints = action.payload;
    },

    setMaintenance: (state, action) => {
      state.maintenance = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setRevenue,
  setOccupancy,
  setBookings,
  setPayments,
  setComplaints,
  setMaintenance,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;