/** @default flags insensitive matching */
export const entirelyMatchString = (str: string, flags = 'i') => {
  return new RegExp(`^${str}$`, flags);
};

/** @default flags insensitive matching */
export const partiallyMatchString = (str: string, flags = 'i') => {
  return new RegExp(str, flags);
};
