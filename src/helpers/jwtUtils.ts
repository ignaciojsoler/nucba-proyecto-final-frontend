import { getFromStorage } from "./handleStorage";

export function isValidJWT(token: string) {
    const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/;
    return jwtRegex.test(token);
}

export const tokenExists = () => {
    const userToken = getFromStorage('token');
    if (!userToken) return null;
    const isValidToken = isValidJWT(userToken);
    if (!isValidToken) return null;
    return isValidToken;
}