/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { RouteHandler } from "workbox-core";
import { log } from "./log";

export const getBases: RouteHandler = async () => {
  const cache = await caches.open("bases");
  const bases = await cache.matchAll("/local-api/bases/", {
    ignoreSearch: true,
  });

  const baseCollection = [];
  for (const base of bases) {
    const cachedData = await base.json();
    baseCollection.push(...cachedData);
  }

  log(`${baseCollection.length} bases found`);

  return new Response(JSON.stringify(baseCollection));
};

export const postBase: RouteHandler = async ({ request }) => {
  const data = await request.json();

  const cache = await caches.open("bases");
  const baseEntries = await cache.matchAll("/local-api/bases/", {
    ignoreSearch: true,
  });
  const collectIds: string[] = [];
  for (const basesData of baseEntries) {
    const cacheData = (await basesData.json()) as { id: string }[];
    cacheData.forEach((d) => collectIds.push(d.id));
  }
  let id = 1;
  while (collectIds.includes(`u${id}`)) {
    id++;
  }

  const dataObject = {
    id: `u${id}`,
    name: data.name ?? "New Village",
    layout: data.layout,
    builtIn: false,
    version: 1,
  };

  await cache.put(
    `/local-api/bases/?id=u${id}`,
    new Response(JSON.stringify([dataObject]))
  );

  return new Response(JSON.stringify(dataObject), { status: 201 });
};

export const putBase: RouteHandler = async ({ url, request }) => {
  const data = await request.json();
  const id = url.pathname.split("/").slice(-1)[0];
  const cache = await caches.open("bases");
  const base = await cache.match(`/local-api/bases/?id=${id}`);

  const dataObject = {
    id: id,
    builtIn: false,
    version: 1,
  };
  if (base) {
    const previousData = await base.json();
    Object.assign(dataObject, previousData);
  }
  Object.assign(dataObject, data);

  await cache.put(
    `/local-api/bases/?id=${id}`,
    new Response(JSON.stringify([dataObject]))
  );
  log(`base ${id} updated`);

  return new Response(JSON.stringify(dataObject));
};

export const deleteBase: RouteHandler = async ({ url }) => {
  const id = url.pathname.split("/").slice(-1)[0];
  const cache = await caches.open("bases");
  await cache.delete(`/local-api/bases/?id=${id}`);

  return new Response(
    JSON.stringify({ status: "ok", id, message: "base deleted" })
  );
};
