export const isObject = (obj: unknown) => {
  return obj === Object(obj)
}

export const isString = (str: unknown) => {
  return (typeof str === 'string' || str instanceof String);
}
