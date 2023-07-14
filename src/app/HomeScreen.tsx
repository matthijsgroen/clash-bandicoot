import { Button } from "../ui-components/atoms/Button";
import { useAppUpdate } from "./hooks/useAppUpdater";

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
      <menu>
        <Button
          onClick={() => setActivePopup("attack")}
          color="orange"
          width="huge"
          height="large"
        >
          Attack
        </Button>

        <Button
          onClick={() => setActivePopup("villageEditor")}
          color="orange"
          width="huge"
          height="large"
        >
          Bases
        </Button>

        <Button
          onClick={() => setActivePopup("attack")}
          color="orange"
          width="huge"
          height="large"
          disabled
        >
          Armies
        </Button>

        <Button
          onClick={() => setActivePopup("attack")}
          color="orange"
          width="huge"
          height="large"
          disabled
        >
          Replays
        </Button>

        <Button
          onClick={() => setActivePopup("attack")}
          color="orange"
          width="huge"
          height="large"
          disabled
        >
          Help
        </Button>
      </menu>

      {hasUpdate && (
        <div>
          <p>
            The app has an update!
            <Button
              color="orange"
              onClick={() => triggerUpdate()}
              width="large"
              height="default"
            >
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
