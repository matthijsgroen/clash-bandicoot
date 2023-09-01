import { newLayout } from "../engine/layout/baseLayout";
import { pack, unpack } from "../engine/layout/packLayout";
import { BaseLayout } from "../engine/types";

export type VillageRequestData = {
  name: string;
  id: string;
  builtIn?: boolean;
  layout: string;
};

export type Village = {
  name: string;
  id: string;
  builtIn?: boolean;
  layout: BaseLayout;
};

const convertFromRequest = (input: VillageRequestData): Village => ({
  id: input.id,
  name: input.name,
  builtIn: input.builtIn,
  layout: unpack(input.layout),
});

export const getBases = async (): Promise<Village[]> => {
  const response = await fetch("/local-api/bases");
  const data = (await response.json()) as VillageRequestData[];
  return data.map(convertFromRequest).sort((a, b) => a.id.localeCompare(b.id));
};

export const postBase = async (
  options: { name: string; layout?: BaseLayout } = { name: "New Village" }
): Promise<Village> => {
  const response = await fetch("/local-api/bases", {
    method: "POST",
    body: JSON.stringify({
      name: options.name,
      layout: pack(options.layout ?? newLayout()),
    }),
  });
  const data = (await response.json()) as VillageRequestData;
  return convertFromRequest(data);
};

export const putBase = async (data: Village): Promise<Village> => {
  const response = await fetch(`/local-api/bases/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: data.name,
      layout: pack(data.layout),
    }),
  });
  const result = (await response.json()) as VillageRequestData;
  return convertFromRequest(result);
};

export const deleteBase = async (data: Village): Promise<void> => {
  await fetch(`/local-api/bases/${data.id}`, {
    method: "DELETE",
  });
};
