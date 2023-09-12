export const categories = [
  "added",
  "changed",
  "deprecated",
  "removed",
  "fixed",
  "security",
] as const;

type CategoryTypes = (typeof categories)[number];

export type Update = {
  date: number;
  version: string;
  changes: Partial<Record<CategoryTypes, string[]>>;
};
