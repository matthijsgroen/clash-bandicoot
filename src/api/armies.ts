import { Army, createArmy } from "../engine/army/armyComposition";
import { pack, unpack } from "../engine/army/packArmy";

export type ArmyRequestData = {
  name: string;
  id: string;
  builtIn?: boolean;
  army: string;
};

export type ArmyItem = {
  name: string;
  id: string;
  builtIn?: boolean;
  army: Army;
};

const convertFromRequest = (input: ArmyRequestData): ArmyItem => ({
  id: input.id,
  name: input.name,
  builtIn: input.builtIn,
  army: unpack(input.army),
});

export const getArmies = async (): Promise<ArmyItem[]> => {
  const response = await fetch("/local-api/armies");
  const data = (await response.json()) as ArmyRequestData[];
  return data.map(convertFromRequest).sort((a, b) => a.id.localeCompare(b.id));
};

export const postArmy = async (
  options: { name: string; army?: Army } = { name: "New Army" }
): Promise<ArmyItem> => {
  const response = await fetch("/local-api/armies", {
    method: "POST",
    body: JSON.stringify({
      name: options.name,
      army: pack(options.army ?? createArmy()),
    }),
  });
  const data = (await response.json()) as ArmyRequestData;
  return convertFromRequest(data);
};

export const putArmy = async (data: ArmyItem): Promise<ArmyItem> => {
  const response = await fetch(`/local-api/armies/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: data.name,
      army: pack(data.army),
    }),
  });
  const result = (await response.json()) as ArmyRequestData;
  return convertFromRequest(result);
};

export const deleteArmy = async (data: ArmyItem): Promise<void> => {
  await fetch(`/local-api/armies/${data.id}`, {
    method: "DELETE",
  });
};
