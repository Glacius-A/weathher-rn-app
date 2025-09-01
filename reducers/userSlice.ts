import { UserI } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState extends UserI {}

const initialState: UserState = {
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
