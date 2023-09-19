import { RouteHandler } from "workbox-core";
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

const updateBadge = async (lastSeen?: number) => {
  const counter = lastSeen
    ? changes.reduce((r, c) => (c.date > lastSeen ? r + 1 : r), 0)
    : 1;
  if ("setAppBadge" in navigator) {
    if (counter > 0) {
      await navigator.setAppBadge(counter);
    } else {
      await navigator.clearAppBadge();
    }
  }
  log(`Setting update counter to ${counter}`);
};

export const updateUpdateCounter = async () => {
  const lastSeen: number | undefined = (await (
    await getLastSeen()
  ).json()) as unknown as number | undefined;
  await updateBadge(lastSeen);
};

export const putLastSeen: RouteHandler = async ({ request }) => {
  const updateCache = await caches.open("updates");
  const timestamp = (await request.json()) as number;
  await updateBadge(timestamp);

  const response = new Response(JSON.stringify(timestamp));
  await updateCache.put(`/local-api/updates/lastSeen`, response.clone());
  return response.clone();
};

export const getLastSeen = async (): Promise<Response> => {
  const updateCache = await caches.open("updates");
  const data = await updateCache.match(`/local-api/updates/lastSeen`);
  if (!data) {
    return new Response(JSON.stringify(undefined));
  }
  return data;
};

export const getUpdates = async () => {
  const cache = await caches.open("updates");
  const result = await cache.match("/local-api/updates");
  if (result === undefined) {
    return new Response(JSON.stringify([]));
  }
  return result;
};
