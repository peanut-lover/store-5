export default function formatPrice(price: string) {
  const number = price.replace(/[^0-9]/g, '');
  if (!number) return '';
  const converted = Number(number).toLocaleString();
  return `${converted}`;
}
