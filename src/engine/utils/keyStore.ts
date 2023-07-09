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
