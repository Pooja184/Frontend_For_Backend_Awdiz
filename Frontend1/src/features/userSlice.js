import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
  },
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  userLogin,
} = userSlice.actions;
export default userSlice.reducer;
