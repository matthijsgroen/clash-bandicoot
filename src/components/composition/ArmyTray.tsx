import styles from "./ArmyTray.module.css";
import { Army } from "../../data/armyComposition";
import classnames from "classnames";

export const UnitButton: React.FC<{
  color: string;
  label?: string;
  amount?: number;
  selected?: boolean;
  level?: number;
}> = ({ color, label, level, amount, selected }) => (
  <button
    className={classnames(styles.trayButton, styles.unit, {
      [styles.selected]: selected,
    })}
  >
    <div className={classnames(styles.amounts)}>
      {amount !== undefined && `${amount}x`}
    </div>
    <div className={styles.portraitBox}>
      <div style={{ backgroundColor: color }} className={styles.portrait}>
        {label}
        {level !== undefined && <div className={styles.level}>{level}</div>}
      </div>
    </div>
  </button>
);

export const Placeholder: React.FC = () => (
  <div className={classnames(styles.trayButton, styles.empty)}></div>
);

export const ArmyTray: React.FC<{ army: Army }> = ({ army }) => {
  return (
    <aside className={styles.armyTray}>
      <div className={styles.scrollArea}>
        <div className={styles.group}>
          <UnitButton color={"red"} label={"Giant"} />
          <UnitButton color={"green"} label={"Goblin"} level={2} selected />
          <UnitButton color={"pink"} label={"Archer"} level={2} amount={5} />
          <Placeholder />
        </div>
        <div className={styles.group}>
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </div>
      </div>
    </aside>
  );
};
