import { useDispatch } from "react-redux";
import { setFavoritesServices } from "../store/favoritesSlice";
import { getFromStorage } from "../helpers/handleStorage";
import { updateUser } from "../store/userSlice";
import { updateToken } from "../store/authenticationTokenSlice";

// Define your functional component
export const useGetStorageData = () => {
  const dispatch = useDispatch();
  const token = getFromStorage("token");
  const user = getFromStorage("user");
  const favoritesServices =
    getFromStorage("favoritesServices");

  if (token) dispatch(updateToken(token));
  if (user) dispatch(updateUser(user));
  if (favoritesServices) dispatch(setFavoritesServices(favoritesServices.favoritesServices));
};
