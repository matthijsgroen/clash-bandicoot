import { changes } from "../data/changes/content";
import { log } from "./log";

export const installUpdates = async () => {
  const updateCache = await caches.open("updates");
  log(`placing ${changes.length} updates in the cache`);
  await updateCache.put(
    `/local-api/updates`,
    new Response(JSON.stringify(changes))
  );
};

export const getUpdates = async () => {
  const cache = await caches.open("updates");
  const result = await cache.match("/local-api/updates");
  if (result === undefined) {
    return new Response(JSON.stringify([]));
  }
  return result;
};
