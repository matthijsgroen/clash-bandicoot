import { Update } from "../data/changes/type";

export const getUpdates = async (): Promise<Update[]> => {
  const response = await fetch("/local-api/updates");
  return response.json() as Promise<Update[]>;
};

export const getLastSeen = async (): Promise<number | null> => {
  const response = await fetch("/local-api/updates/last-seen");
  return response.json() as Promise<number | null>;
};

export const putLastSeen = async (
  timestamp: number
): Promise<number | null> => {
  const body = JSON.stringify(timestamp);
  const response = await fetch("/local-api/updates/last-seen", {
    body,
    method: "PUT",
  });
  return response.json() as Promise<number | null>;
};
