export default function fixFloat(num: number, toFixedCount: number = 2): number {
  return parseFloat((num).toFixed(toFixedCount));
}