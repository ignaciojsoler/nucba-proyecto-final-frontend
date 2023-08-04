import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import authenticationTokenSlice from './authenticationTokenSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    token: authenticationTokenSlice
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch