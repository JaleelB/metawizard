type StorageType = "session" | "local";

const getStorage = (type: StorageType) => {
  return type === "session" ? sessionStorage : localStorage;
};

export const saveToStorage = <T>(
  uniqueKey: string,
  values: T,
  storageType: StorageType
) => {
  try {
    getStorage(storageType).setItem(uniqueKey, JSON.stringify(values));
    return true;
  } catch (error) {
    return false;
  }
};

export const retrieveFromStorage = <T>(
  uniqueKey: string,
  storageType: StorageType
): T | null => {
  try {
    const data = getStorage(storageType).getItem(uniqueKey);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};
