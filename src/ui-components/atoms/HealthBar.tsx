import styles from "./HealthBar.module.css";
import { CSSProperties } from "react";

type HealthBarProperties = {
  "--progress": number;
  "--color": CSSProperties["color"];
} & CSSProperties;

export const HealthBar: React.FC<{
  progress: number;
  baseColor: CSSProperties["color"];
}> = ({ progress, baseColor }) => (
  <div
    style={
      { "--progress": progress, "--color": baseColor } as HealthBarProperties
    }
    className={styles.healthBar}
  ></div>
);
