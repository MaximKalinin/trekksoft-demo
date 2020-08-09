function set(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

function get(key: string): IGetCache {
  const value = sessionStorage.getItem(key);
  if (value === null) {
    return {
      isValid: false,
    };
  }
  return {
    isValid: true,
    value,
  };
}

interface IGetCache {
  isValid: boolean;
  value?: string;
}

export const cache = {
  set,
  get,
};
