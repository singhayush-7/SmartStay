import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.initialized = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.initialized = true;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setInitialized(state, action) {
      state.initialized = action.payload;
    },

    resetAuthState(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  logout,
  setError,
  setInitialized,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;