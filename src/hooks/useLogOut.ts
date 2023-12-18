import { useDispatch } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { updateToken } from "../store/authenticationTokenSlice";
import { setFavoritesServices } from "../store/favoritesSlice";
import { updateUser } from "../store/userSlice";

export const useLogOut = () => {
  const dispatch = useDispatch();

  const logOut = (navigate: NavigateFunction) => {
    dispatch(updateToken(null));
    dispatch(setFavoritesServices([]));
    dispatch(
      updateUser({
        id: "",
        name: "",
        email: "",
        role: null,
        profileImage: "",
      })
    );

    sessionStorage.clear();

    navigate("/login");
  };

  return {
    logOut,
  };
};
