import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  payment: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
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

    setPayments: (state, action) => {
      state.payments = action.payload;
    },

    setPayment: (state, action) => {
      state.payment = action.payload;
    },

    addPayment: (state, action) => {
      state.payments.unshift(action.payload);
    },

    updatePayment: (state, action) => {
      state.payments = state.payments.map((payment) =>
        payment._id === action.payload._id
          ? action.payload
          : payment
      );

      if (
        state.payment &&
        state.payment._id === action.payload._id
      ) {
        state.payment = action.payload;
      }
    },

    removePayment: (state, action) => {
      state.payments = state.payments.filter(
        (payment) => payment._id !== action.payload
      );

      if (
        state.payment &&
        state.payment._id === action.payload
      ) {
        state.payment = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPayments,
  setPayment,
  addPayment,
  updatePayment,
  removePayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;