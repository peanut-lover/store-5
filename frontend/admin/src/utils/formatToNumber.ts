export default function formatPrice(price: number) {
  const converted = Number(price).toLocaleString('ko-KR');
  return `${converted} 원`;
}
