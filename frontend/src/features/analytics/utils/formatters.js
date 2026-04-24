/* 🔥 FORMAT LARGE NUMBERS (1.2K, 3.4M) */
export const formatNumber = (num) => {
  if (!num && num !== 0) return "-";

  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";

  return num.toString();
};

/* 🔥 FORMAT WITH COMMAS */
export const formatFullNumber = (num) => {
  if (!num && num !== 0) return "-";
  return num.toLocaleString();
};

/* 🔥 FORMAT PERCENT */
export const formatPercent = (num) => {
  if (!num && num !== 0) return "-";
  return `${num.toFixed(0)}%`;
};

/* 🔥 FORMAT CHANGE (+12%, -5%) */
export const formatChange = (num) => {
  if (!num && num !== 0) return "-";

  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
};

/* 🔥 FORMAT TIME (ms → readable) */
export const formatTime = (ms) => {
  if (!ms && ms !== 0) return "-";

  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;

  return `${(ms / 60000).toFixed(1)}m`;
};

/* 🔥 FORMAT DAY LABEL */
export const formatDayLabel = (index, total) => {
  if (index === total - 1) return "Today";
  if (index === total - 2) return "Yesterday";

  return `Day ${index + 1}`;
};

/* 🔥 FORMAT DATE (OPTIONAL FUTURE) */
export const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  } catch {
    return "-";
  }
};