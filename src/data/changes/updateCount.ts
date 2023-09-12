import { Update } from "./type";

const UPDATE_KEY = "last-bandicoot-update";

export const getLastUpdateSeen = () => {
  const lastUpdateSeenData = localStorage.getItem(UPDATE_KEY);
  let lastUpdateSeen: number | undefined = undefined;
  try {
    lastUpdateSeen = lastUpdateSeenData
      ? JSON.parse(lastUpdateSeenData)
      : undefined;
  } catch (e) {}
  return lastUpdateSeen;
};

export const updateUpdatesSeen = (updates: Update[]) => {
  if (updates.length === 0) {
    localStorage.removeItem(UPDATE_KEY);
  }
  localStorage.setItem(UPDATE_KEY, JSON.stringify(updates[0].date));
};

export const getNewUpdateCount = (updates?: Update[]) => {
  if (updates === undefined) {
    return 0;
  }
  const lastUpdateSeen = getLastUpdateSeen();
  if (lastUpdateSeen === undefined) {
    updateUpdatesSeen(updates);

    return 0;
  }

  return updates.reduce((n, u) => (u.date > lastUpdateSeen ? n + 1 : n), 0);
};
