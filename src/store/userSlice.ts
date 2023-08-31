import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";
import { saveOnStorage } from "../helpers/handleStorage";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  role: null,
  profileImage: ""
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
      state.profileImage = action.payload.profileImage
      saveOnStorage("user", current(state));
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
