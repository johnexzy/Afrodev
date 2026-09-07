export const articleTime = (date?: string): number => {
  if (!date) return 0;
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
};
export const yearOf = (date?: string) =>
  articleTime(date) ? String(new Date(articleTime(date)).getFullYear()) : "";
export const isoDate = (date?: string) =>
  articleTime(date)
    ? new Date(articleTime(date)).toISOString().slice(0, 10)
    : undefined;
export const shortDate = (date?: string) =>
  articleTime(date)
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
        new Date(articleTime(date)),
      )
    : "";
