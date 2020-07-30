export default function timePipe(
  timeInSeconds: number,
  formatSize: number = 2
): string {
  const format = (num: number) => ('00' + num).slice(formatSize * -1);

  const minutes = Math.floor(timeInSeconds / 60) % 60;
  const seconds = Math.floor(timeInSeconds - minutes * 60);

  return `${format(minutes)}:${format(seconds)}`;
}
