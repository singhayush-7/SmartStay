import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
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

    setRooms: (state, action) => {
      state.rooms = action.payload;
    },

    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },

    addRoom: (state, action) => {
      state.rooms.unshift(action.payload);
    },

    updateRoom: (state, action) => {
      state.rooms = state.rooms.map((room) =>
        room._id === action.payload._id
          ? action.payload
          : room
      );

      if (
        state.selectedRoom?._id ===
        action.payload._id
      ) {
        state.selectedRoom = action.payload;
      }
    },

    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter(
        (room) => room._id !== action.payload
      );

      if (
        state.selectedRoom?._id === action.payload
      ) {
        state.selectedRoom = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setRooms,
  setSelectedRoom,
  addRoom,
  updateRoom,
  removeRoom,
} = roomSlice.actions;

export default roomSlice.reducer;