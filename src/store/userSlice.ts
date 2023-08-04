import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";
import { saveOnStorage } from "../helpers/handleStorage";

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
        console.log(action.payload)
      state.user = {
        ...state,
        ...action.payload,
      };
      saveOnStorage('user', state);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
