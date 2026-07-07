import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    setProperties(state, action) {
      state.properties = action.payload;
      state.error = null;
    },

    setSelectedProperty(state, action) {
      state.selectedProperty = action.payload;
    },

    addProperty(state, action) {
      state.properties.unshift(action.payload);
    },

    updateProperty(state, action) {
      const updatedProperty = action.payload;

      state.properties = state.properties.map((property) =>
        property._id === updatedProperty._id
          ? updatedProperty
          : property
      );

      if (
        state.selectedProperty &&
        state.selectedProperty._id === updatedProperty._id
      ) {
        state.selectedProperty = updatedProperty;
      }
    },

    removeProperty(state, action) {
      state.properties = state.properties.filter(
        (property) => property._id !== action.payload
      );

      if (
        state.selectedProperty &&
        state.selectedProperty._id === action.payload
      ) {
        state.selectedProperty = null;
      }
    },

    resetPropertyState(state) {
      state.properties = [];
      state.selectedProperty = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setProperties,
  setSelectedProperty,
  addProperty,
  updateProperty,
  removeProperty,
  resetPropertyState,
} = propertySlice.actions;

export default propertySlice.reducer;