import { NavigateFunction } from "react-router-dom";

export const logOut = (navigate: NavigateFunction) => {
    sessionStorage.clear();
    navigate("/login");
};