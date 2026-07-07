import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,

  loading: false,

  error: null,

  passwordChanged: false,

  profileUpdated: false,
};

const profileSlice = createSlice({
  name: "profile",

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

    
    
    

    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };

      state.profileUpdated = true;
    },

    clearProfileUpdated: (state) => {
      state.profileUpdated = false;
    },

    
    
    

    passwordChanged: (state) => {
      state.passwordChanged = true;
    },

    clearPasswordChanged: (state) => {
      state.passwordChanged = false;
    },

    
    
    

    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.passwordChanged = false;
      state.profileUpdated = false;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,

  setProfile,
  updateProfile,
  clearProfileUpdated,

  passwordChanged,
  clearPasswordChanged,

  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;