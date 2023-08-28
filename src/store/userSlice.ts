import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";
import { saveOnStorage } from "../helpers/handleStorage";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      saveOnStorage("user", state);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
