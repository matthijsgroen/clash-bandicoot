import { Update } from "../data/changes/type";

export const getUpdates = async (): Promise<Update[]> => {
  const response = await fetch("/local-api/updates");
  return response.json() as Promise<Update[]>;
};
