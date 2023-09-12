import { readFile } from "fs/promises";
import { changes } from "./content";
import yaml from "yaml";

const toContentChanges = (entry: { date: string }) => ({
  ...entry,
  date: Date.parse(entry.date),
});

describe("update contents", () => {
  it("matches the yaml counterpart", async () => {
    const contents = await readFile("./src/changes.yml", "utf-8");
    const fromYaml = yaml.parse(contents);
    const jsonString = JSON.stringify(fromYaml.changes.map(toContentChanges));
    expect(jsonString).toEqual(JSON.stringify(changes));
  });
});
