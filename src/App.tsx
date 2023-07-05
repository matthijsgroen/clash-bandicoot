import { army, village2 } from "./testScenarios/simpleVillage";
import { Combat } from "./app/Combat";
import { useState } from "react";
import { Button } from "./ui-components/atoms/Button";

const App = () => {
  const [popupActive, setActivePopup] = useState<null | "attack">(null);

  return (
    <div>
      {popupActive === "attack" && <Combat base={village2} army={army} />}
      {popupActive === null && (
        <div>
          <header>
            <h1>Clash Bandicoot</h1>
            <p>The useless clash coach</p>
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

          <footer>
            <p>
              This material is unofficial and is not endorsed by Supercell. For
              more information see Supercell's Fan Content Policy:
              <a href="www.supercell.com/fan-content-policy" target="policy">
                www.supercell.com/fan-content-policy
              </a>
              .
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
