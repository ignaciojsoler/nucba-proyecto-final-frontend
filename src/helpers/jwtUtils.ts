export function isValidJWT(token: string) {
    const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/;
    return jwtRegex.test(token);
}