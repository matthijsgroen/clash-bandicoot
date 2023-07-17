import { createKeyStore, createNextKey } from "./keyStore";

describe("createKeyStore", () => {
  it("can generate unique readable keys", () => {
    const store = createKeyStore();

    expect(store.getKey("cat")).toEqual("cat#1");
    expect(store.getKey("cat")).toEqual("cat#2");
    expect(store.getKey("dog")).toEqual("dog#1");
  });

  it("can be seeded with taken keys", () => {
    const store = createKeyStore(["cat#1", "cat#2"]);

    expect(store.getKey("cat")).toEqual("cat#3");
    expect(store.getKey("cat")).toEqual("cat#4");
    expect(store.getKey("dog")).toEqual("dog#1");
  });
});

describe("createNextKey", () => {
  it("returns a new key directly", () => {
    expect(createNextKey([], "cat")).toEqual("cat#1");
    expect(createNextKey(["cat#1"], "cat")).toEqual("cat#2");
  });
});
