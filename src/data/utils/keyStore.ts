export const createKeyStore = () => {
  const store: Record<string, number> = {};

  return {
    getKey: (type: string): string => {
      store[type] = store[type] || 0;
      store[type]++;
      return `${type}#${store[type]}`;
    },
  };
};
