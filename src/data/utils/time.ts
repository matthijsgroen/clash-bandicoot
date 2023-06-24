export const time = (timeStr: string): number => {
  const match = timeStr.match(
    /^((?<days>\d+)d)?((?<hours>\d+)h)?((?<minutes>\d+)m)?((?<seconds>\d+)s)?$/
  );

  const seconds: number = parseInt(match?.groups?.seconds ?? "0", 10);
  const minutes: number = parseInt(match?.groups?.minutes ?? "0", 10) * 60;
  const hours: number = parseInt(match?.groups?.hours ?? "0", 10) * 60 * 60;
  const days: number = parseInt(match?.groups?.days ?? "0", 10) * 60 * 60 * 24;

  return seconds + minutes + hours + days;
};
