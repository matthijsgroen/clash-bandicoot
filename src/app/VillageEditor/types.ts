export type VillageSelection =
  | null
  | {
      buildings: {
        id: string;
        position: [x: number, y: number];
        isNew?: boolean;
      }[];
    }
  | { buildingType: string; level: number };
