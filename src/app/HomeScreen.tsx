import { Button } from "../ui-components/atoms/Button";
import { setAppUpdate, useAppUpdate } from "./hooks/useAppUpdater";

export const HomeScreen: React.FC<{
  setActivePopup: (name: string | null) => void;
}> = ({ setActivePopup }) => {
  const [hasUpdate, triggerUpdate] = useAppUpdate();

  return (
    <div>
      <header>
        <h1>Clash Bandicoot</h1>
        <p>
          The useless clash coach.{" "}
          <strong>
            This app is under construction. Everything can potentially break or
            change.
          </strong>
        </p>
      </header>

      <Button
        onClick={() => setActivePopup("attack")}
        color="orange"
        square={true}
      >
        Attack
      </Button>

      <Button
        onClick={() => setActivePopup("attack")}
        color="orange"
        square={true}
        disabled
      >
        Bases
      </Button>

      <Button
        onClick={() => setActivePopup("attack")}
        color="orange"
        square={true}
        disabled
      >
        Armies
      </Button>

      <Button
        onClick={() => setActivePopup("attack")}
        color="orange"
        square={true}
        disabled
      >
        Replays
      </Button>

      <Button
        onClick={() => setActivePopup("attack")}
        color="orange"
        square={true}
        disabled
      >
        Help
      </Button>

      {hasUpdate && (
        <div>
          <p>
            The app has an update!
            <Button color="orange" onClick={() => triggerUpdate()}>
              Update now
            </Button>
          </p>
        </div>
      )}

      <footer>
        <p>
          This material is unofficial and is not endorsed by Supercell. For more
          information see Supercell's Fan Content Policy:
          <a href="www.supercell.com/fan-content-policy" target="policy">
            www.supercell.com/fan-content-policy
          </a>
          .
        </p>
      </footer>
    </div>
  );
};
