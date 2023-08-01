export const saveOnStorage = (key: string, data: unknown) => {
    const savedData = sessionStorage.setItem(key, JSON.stringify(data));
    return savedData;
};

export const getFromStorage = (key: string) => {
    const obtainedData = sessionStorage.getItem(key);
    if (!obtainedData) return null;
    return JSON.parse(obtainedData);
};

export const removeFromStorage = (key: string) => {
    return sessionStorage.removeItem(key);
}