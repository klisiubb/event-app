export function formatDate(date: Date): string {
  return date.toLocaleDateString("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(start: Date, end: Date): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return `${start.toLocaleTimeString(
    "en",
    formatOptions
  )} - ${end.toLocaleTimeString("en", formatOptions)}`;
}