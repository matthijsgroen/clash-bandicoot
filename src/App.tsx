import { army, village } from "./testScenarios/simpleVillage";
import { Combat } from "./components/Combat";
import { useState } from "react";
import { PathFinding } from "./debug/Pathfinding";

const App = () => {
  const [popupActive, setActivePopup] = useState<
    null | "attack" | "pathFinding"
  >(null);

  return (
    <div>
      {popupActive === "attack" && <Combat base={village} army={army} />}
      {popupActive === "pathFinding" && <PathFinding base={village} />}

      <button onClick={() => setActivePopup("attack")}>Attack</button>
      <button onClick={() => setActivePopup("pathFinding")}>
        PathFinding test
      </button>
    </div>
  );
};

export default App;
