export const pack = (compressedLayout: Uint8Array): string => {
  const binString = Array.from(compressedLayout, (x) =>
    String.fromCodePoint(x)
  ).join("");
  let result = btoa(binString).replace(/\//g, "_").replace(/\+/g, "-");
  while (result.endsWith("=")) {
    result = result.slice(0, -1);
  }
  return result;
};

export const unpack = (base64urlString: string): Uint8Array => {
  const binString = atob(base64urlString.replace(/_/g, "/").replace(/-/g, "+"));
  const buffer = Uint8Array.from(
    binString as unknown as string[],
    (m) => m.codePointAt(0) ?? 0
  );
  return buffer;
};
