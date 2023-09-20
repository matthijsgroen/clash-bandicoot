import { Update } from "./type";

export const getNewUpdateCount = (
  updates?: Update[],
  lastSeen?: number | null
) => {
  if (updates === undefined || lastSeen === undefined || lastSeen === null) {
    return 0;
  }

  return updates.reduce((n, u) => (u.date > lastSeen ? n + 1 : n), 0);
};
