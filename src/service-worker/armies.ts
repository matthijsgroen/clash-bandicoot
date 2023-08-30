/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { RouteHandler } from "workbox-core";
import { log } from "./log";
import { ArmyRequestData } from "../api/armies";

export const getArmies: RouteHandler = async () => {
  const cache = await caches.open("armies");
  const armies = await cache.matchAll("/local-api/armies/", {
    ignoreSearch: true,
  });

  const armyCollection = [];
  for (const army of armies) {
    const cachedData = await army.json();
    armyCollection.push(...cachedData);
  }

  log(`${armyCollection.length} armies found`);

  return new Response(JSON.stringify(armyCollection));
};

export const postArmy: RouteHandler = async ({ request }) => {
  const data = (await request.json()) as ArmyRequestData;

  const cache = await caches.open("armies");
  const armyEntries = await cache.matchAll("/local-api/armies/", {
    ignoreSearch: true,
  });
  const collectIds: string[] = [];
  for (const armiesData of armyEntries) {
    const cacheData = (await armiesData.json()) as { id: string }[];
    cacheData.forEach((d) => collectIds.push(d.id));
  }
  let id = 1;
  while (collectIds.includes(`u${id}`)) {
    id++;
  }

  const dataObject = {
    id: `u${id}`,
    name: data.name ?? "New Army",
    army: data.army,
    builtIn: false,
    version: 1,
  };

  await cache.put(
    `/local-api/armies/?id=u${id}`,
    new Response(JSON.stringify([dataObject]))
  );

  return new Response(JSON.stringify(dataObject), { status: 201 });
};

export const putArmy: RouteHandler = async ({ url, request }) => {
  const data = await request.json();
  const id = url.pathname.split("/").slice(-1)[0];
  const cache = await caches.open("armies");
  const base = await cache.match(`/local-api/armies/?id=${id}`);

  const dataObject = {
    id: id,
    builtIn: false,
    version: 1,
  };
  if (base) {
    const previousData = (await base.json()) as ArmyRequestData[][0];
    Object.assign(dataObject, previousData);
    delete (dataObject as any)[0];
  }
  Object.assign(dataObject, data);

  await cache.put(
    `/local-api/armies/?id=${id}`,
    new Response(JSON.stringify([dataObject]))
  );
  log(`army ${id} updated`);

  return new Response(JSON.stringify(dataObject));
};

export const deleteArmy: RouteHandler = async ({ url }) => {
  const id = url.pathname.split("/").slice(-1)[0];
  const cache = await caches.open("armies");
  await cache.delete(`/local-api/armies/?id=${id}`);
  log(`army ${id} deleted`);

  return new Response(
    JSON.stringify({ status: "ok", id, message: "army deleted" })
  );
};
