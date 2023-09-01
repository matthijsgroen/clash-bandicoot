/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { RouteHandler } from "workbox-core";
import { log } from "./log";
import { VillageRequestData } from "../api/bases";
import { factoryBases } from "./factory-bases";

export const installBases = async () => {
  const baseCache = await caches.open("bases");
  log(`placing ${factoryBases.length} bases in the cache`);
  await baseCache.put(
    `/local-api/bases/?id=builtin`,
    new Response(
      JSON.stringify(
        factoryBases.map((record, index) => ({
          ...record,
          id: `bi${index}`,
          builtIn: true,
          version: 1,
        }))
      )
    )
  );
};

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
  const data = (await request.json()) as VillageRequestData;
  const id = url.pathname.split("/").slice(-1)[0];
  const cache = await caches.open("bases");
  const base = await cache.match(`/local-api/bases/?id=${id}`);

  const dataObject = {
    id: id,
    builtIn: false,
    version: 1,
  };
  if (base) {
    const previousData = ((await base.json()) as VillageRequestData[])[0];
    Object.assign(dataObject, previousData);
    delete (dataObject as any)[0];
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
  log(`base ${id} deleted`);

  return new Response(
    JSON.stringify({ status: "ok", id, message: "base deleted" })
  );
};
