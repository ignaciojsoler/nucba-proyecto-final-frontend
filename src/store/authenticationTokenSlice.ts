import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "../helpers/handleStorage";

interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: getFromStorage('token') || null,
};

export const authenticationTokenSlice = createSlice({
  name: "authenticationToken",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { updateToken } = authenticationTokenSlice.actions;
export default authenticationTokenSlice.reducer;
