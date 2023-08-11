import { PropsWithChildren } from "react";

export const Column: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    }}
  >
    {children}
  </div>
);
