import { useEffect, useState } from "react";

let hasServiceWorker = false;
let notifyUpdate: (() => void)[] = [];

export const setHasServiceWorker = () => {
  hasServiceWorker = true;
  for (const notifier of notifyUpdate) {
    notifier();
  }
};

export const useServiceWorker = (): boolean => {
  const [available, setAvailable] = useState<boolean>(hasServiceWorker);
  useEffect(() => {
    const handler = () => {
      setAvailable(true);
    };
    notifyUpdate = notifyUpdate.concat(handler);
    return () => {
      notifyUpdate = notifyUpdate.filter((h) => h !== handler);
    };
  }, []);

  return available;
};
