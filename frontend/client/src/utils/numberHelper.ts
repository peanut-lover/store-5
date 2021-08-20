export const fullNumberFormat = (data: number, idx: number): string => {
  const numberStr = String(data);
  if (numberStr.length > idx) {
    return numberStr;
  } else {
    return '0'.repeat(numberStr.length - idx) + numberStr;
  }
};
