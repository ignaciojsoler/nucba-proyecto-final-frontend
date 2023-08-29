import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteService } from '../interfaces/interfaces';
import { saveOnStorage } from '../helpers/handleStorage';

// Define la interfaz para el estado del slice
interface FavoritesState {
  favoritesServices: FavoriteService[];
}

const initialState: FavoritesState = {
  favoritesServices: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteService: (state, action: PayloadAction<FavoriteService>) => {
      state.favoritesServices.push(action.payload);
      saveOnStorage("favoritesServices", state);
    },
    removeFavoriteService: (state, action: PayloadAction<string>) => {
      state.favoritesServices = state.favoritesServices.filter(
        (favorite) => favorite.id !== action.payload
      );
      saveOnStorage("favoritesServices", state);
    },
    setFavoritesServices: (state, action: PayloadAction<FavoriteService[]>) => {
      if (!action.payload) return;
      state.favoritesServices = action.payload;
    },
  },
});

export const { addFavoriteService, removeFavoriteService, setFavoritesServices } = favoritesSlice.actions;

export default favoritesSlice.reducer;
