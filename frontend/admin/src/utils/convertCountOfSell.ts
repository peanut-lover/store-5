const MILLION = 1000000;
const K = 1000;

export default function convertCountOfSell(num: number): string {
  if (num >= MILLION) {
    const new_num = Math.floor((num / MILLION) * 10) / 10;
    return `${new_num}M`;
  }
  if (num >= K) {
    const new_num = Math.floor((num / K) * 10) / 10;
    return `${new_num}K`;
  }
  return `${num}`;
}
