export const isObject = (obj: unknown) => {
  return obj === Object(obj)
};

export const isString = (str: unknown) => {
  return (typeof str === 'string' || str instanceof String);
};

export const isEmpty = (list: unknown[]): boolean => {
  return list == null || list.length === 0;
};
