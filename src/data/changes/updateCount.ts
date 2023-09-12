import { Update } from "./type";

export const getNewUpdateCount = (updates?: Update[], lastSeen?: number) => {
  if (updates === undefined || lastSeen === undefined) {
    return 0;
  }

  return updates.reduce((n, u) => (u.date > lastSeen ? n + 1 : n), 0);
};
