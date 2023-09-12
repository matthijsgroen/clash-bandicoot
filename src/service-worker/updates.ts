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

export const putLastSeen: RouteHandler = async ({ url, request }) => {
  const updateCache = await caches.open("updates");
  const timestamp = (await request.json()) as number;
  const response = new Response(JSON.stringify(timestamp));
  await updateCache.put(`/local-api/updates/lastSeen`, response);
  return response;
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
