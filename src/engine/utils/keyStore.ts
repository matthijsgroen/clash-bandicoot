export const createKeyStore = (initialKeys: string[] = []) => {
  const store: Record<string, number> = {};

  return {
    getKey: (type: string): string => {
      let key = "";

      do {
        store[type] = store[type] || 0;
        store[type]++;
        key = `${type}#${store[type]}`;
      } while (initialKeys.includes(key));

      return key;
    },
  };
};

export const createNextKey = (
  initialKeys: string[],
  keyType: string
): string => {
  let counter = 0;
  let resultKey = `${keyType}#${counter}`;
  while (initialKeys.includes(resultKey)) {
    counter++;
    resultKey = `${keyType}#${counter}`;
  }
  return resultKey;
};
