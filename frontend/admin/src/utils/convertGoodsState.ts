export default function convertGoodsState(name: string): string {
  if (name === '판매중') return 'S';
  if (name === '임시저장') return 'T';
  if (name === '삭제') return 'D';
  return name;
}
