export const isNumber = (target: any): boolean => {
  if (isNaN(target)) return false;
  return true;
};

export const isString = (target: any): boolean => {
  if (!(target instanceof String) || typeof target !== 'string') return false;
  return true;
};

// TODO: boolean 0, 1도 판단의 기준으로 삼아야 하는가?
export const isBoolean = (target: any): boolean => {
  if (target instanceof Boolean || typeof target === 'boolean') return true;
  if (target === '0' || target === '1' || target === 0 || target === 1) return true;
  return false;
};
