const isBrowser = typeof window !== "undefined";

export const getItem = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setItem = (key: string, value: unknown) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};

export const clear = () => {
  if (!isBrowser) return;
  localStorage.clear();
};

export const getAllKeys = (): string[] => {
  if (!isBrowser) return [];
  return Object.keys(localStorage);
};

export const getStorageSize = (): number => {
  if (!isBrowser) return 0;
  return localStorage.length;
};
