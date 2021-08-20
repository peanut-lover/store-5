export function convertYYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}
