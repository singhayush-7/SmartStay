import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaints: [],
  complaint: null,
  loading: false,
  error: null,
};

const complaintSlice = createSlice({
  name: "complaint",
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

    setComplaints: (state, action) => {
      state.complaints = action.payload;
    },

    setComplaint: (state, action) => {
      state.complaint = action.payload;
    },

    addComplaint: (state, action) => {
      state.complaints.unshift(action.payload);
    },

    updateComplaint: (state, action) => {
      state.complaints = state.complaints.map((complaint) =>
        complaint._id === action.payload._id
          ? action.payload
          : complaint
      );

      if (
        state.complaint &&
        state.complaint._id === action.payload._id
      ) {
        state.complaint = action.payload;
      }
    },

    removeComplaint: (state, action) => {
      state.complaints = state.complaints.filter(
        (complaint) => complaint._id !== action.payload
      );

      if (
        state.complaint &&
        state.complaint._id === action.payload
      ) {
        state.complaint = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setComplaints,
  setComplaint,
  addComplaint,
  updateComplaint,
  removeComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;