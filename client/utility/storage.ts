
type StorageType = 'local' | 'session';

const getStorage = (type: StorageType) => {
  if (typeof window !== 'undefined') {
    return type === 'local' ? window.localStorage : window.sessionStorage;
  }
}

const setToStorage = <T>(key: string, value: T, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage?.setItem(key, JSON.stringify(value));
};

const getFromStorage = <T>(key: string, type: StorageType = 'local'): T | null => {
  const storage = getStorage(type);
  const value = storage?.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

const removeFromStorage = (key: string, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage?.removeItem(key);
};

const clearStorage = (type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage?.clear();
};


export { setToStorage, getFromStorage, removeFromStorage, clearStorage };