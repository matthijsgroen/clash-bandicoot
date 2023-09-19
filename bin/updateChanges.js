#!/usr/bin/env node

const { readFile, writeFile } = require("fs/promises");
const prettier = require("prettier");
const Yaml = require("yaml");

/**
 * @typedef {Object} Changelog
 * @property {Entry[]} changes
 *
 * @typedef {Object} Entry
 * @property {string} date
 * @property {string} version
 * @property {Changes} changes
 *
 * @typedef {Object} Changes
 * @property {string[] | undefined} added
 * @property {string[] | undefined} changed
 * @property {string[] | undefined} deprecated
 * @property {string[] | undefined} removed
 * @property {string[] | undefined} fixed
 * @property {string[] | undefined} security
 */

/**
 * @param {Entry} entry
 */
const toMarkdownChanges = (entry) => {
  const lines = [];

  const date = entry.date.includes("T")
    ? new Date(Date.parse(`${entry.date}Z`)).toLocaleString("sv-se", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        minute: "numeric",
        hour: "numeric",
        timeZone: "UTC",
      })
    : new Date(Date.parse(`${entry.date}Z`)).toLocaleString("sv-se", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "UTC",
      });

  lines.push(`## [${entry.version}] - ${date}`);

  for (const [title, items] of Object.entries(entry.changes)) {
    if (items) {
      lines.push(
        "",
        `### ${title.charAt(0).toUpperCase()}${title.slice(1)}`,
        ""
      );
      lines.push(...items.map((l) => `- ${l}`));
    }
  }

  return lines.join("\n");
};

/**
 * @param {Entry} entry
 */
const toContentChanges = (entry) => ({
  ...entry,
  date: Date.parse(`${entry.date}Z`),
});

const main = async () => {
  const contents = await readFile("./src/changes.yml", "utf-8");
  const template = await readFile("./bin/templates/CHANGELOG.md", "utf-8");
  /** @type {Changelog} */
  const data = Yaml.parse(contents);

  console.log(data.changes);

  // Write changelog file
  const markdownChanges = data.changes.map(toMarkdownChanges);
  const newChangelog = `${template}\n${markdownChanges.join("\n\n")}\n`;
  await writeFile("./CHANGELOG.md", newChangelog);

  // Create JSON file for App
  const contentChanges = data.changes.map(toContentChanges);
  const userChanges = prettier.format(
    'import { Update } from "./type";\n' +
      `export const changes: Update[] = ${JSON.stringify(contentChanges)};`,
    { parser: "typescript" }
  );
  await writeFile("./src/data/changes/content.ts", userChanges);
};

main();
