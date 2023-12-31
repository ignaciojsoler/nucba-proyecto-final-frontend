import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import authenticationTokenSlice from './authenticationTokenSlice'
import favoritesSlice from './favoritesSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    token: authenticationTokenSlice,
    favorites: favoritesSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch