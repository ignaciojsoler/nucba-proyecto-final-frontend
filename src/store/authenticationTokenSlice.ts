import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveOnStorage } from "../helpers/handleStorage";

interface Token {
    token: string | null
}

const initialState: Token = {
    token: null,
};

export const authenticationTokenSlice = createSlice({
  name: "authenticationToken",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      saveOnStorage('token', state);
    },
  },
});

export const { updateToken } = authenticationTokenSlice.actions;
export default authenticationTokenSlice.reducer;
