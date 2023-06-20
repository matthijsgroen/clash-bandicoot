import { time } from "./time";

describe(time, () => {
  describe("seconds", () => {
    it.each([
      ["2s", 2],
      ["10s", 10],
    ])("parses %s", (str, result) => {
      expect(time(str)).toEqual(result);
    });
  });

  describe("minutes", () => {
    it.each([
      ["2m", 120],
      ["10m", 600],
    ])("parses %s", (str, result) => {
      expect(time(str)).toEqual(result);
    });
  });

  describe("hours", () => {
    it.each([
      ["2h", 2 * 60 * 60],
      ["10h", 10 * 60 * 60],
    ])("parses %s", (str, result) => {
      expect(time(str)).toEqual(result);
    });
  });

  describe("days", () => {
    it.each([
      ["2d", 2 * 60 * 60 * 24],
      ["10d", 10 * 60 * 60 * 24],
    ])("parses %s", (str, result) => {
      expect(time(str)).toEqual(result);
    });
  });

  describe("mixed", () => {
    it.each([
      ["2d12h", 2.5 * 60 * 60 * 24],
      ["1h15m", 1.25 * 60 * 60],
    ])("parses %s", (str, result) => {
      expect(time(str)).toEqual(result);
    });
  });
});
