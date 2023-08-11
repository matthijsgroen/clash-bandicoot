import { PropsWithChildren } from "react";

export const Row: React.FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: "flex", gap: "0.5rem" }}>{children}</div>
);
