import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maintenances: [],
  maintenance: null,
  loading: false,
  error: null,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
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

    setMaintenances: (state, action) => {
      state.maintenances = action.payload;
    },

    setMaintenance: (state, action) => {
      state.maintenance = action.payload;
    },

    addMaintenance: (state, action) => {
      state.maintenances.unshift(action.payload);
    },

    updateMaintenance: (state, action) => {
      state.maintenances = state.maintenances.map((maintenance) =>
        maintenance._id === action.payload._id
          ? action.payload
          : maintenance
      );

      if (
        state.maintenance &&
        state.maintenance._id === action.payload._id
      ) {
        state.maintenance = action.payload;
      }
    },

    removeMaintenance: (state, action) => {
      state.maintenances = state.maintenances.filter(
        (maintenance) => maintenance._id !== action.payload
      );

      if (
        state.maintenance &&
        state.maintenance._id === action.payload
      ) {
        state.maintenance = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setMaintenances,
  setMaintenance,
  addMaintenance,
  updateMaintenance,
  removeMaintenance,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;