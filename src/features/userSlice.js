import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    // These are called actions (login, logout)
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user; // This goes into the state of the "global store" (redux)
// then goes into the user slice/ user section/ user aisle
// and gets the user from the store

export default userSlice.reducer;
