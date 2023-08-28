import { getFromStorage } from "./handleStorage";

export function isValidJWT(token: string) {
    const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/;
    return jwtRegex.test(token);
}

export const tokenExists = () => {
    const userToken = getFromStorage('token');
    if (!userToken) return null;
    console.log(userToken.token)
    const isValidToken = isValidJWT(userToken);
    console.log(isValidToken)
    if (!isValidToken) return null;
    return isValidToken;
}