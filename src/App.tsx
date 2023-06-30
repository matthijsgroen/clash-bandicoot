import { army, village } from "./testScenarios/simpleVillage";
import { Combat } from "./components/Combat";
import { useState } from "react";

const App = () => {
  const [popupActive, setActivePopup] = useState<null | "attack">(null);

  return (
    <div>
      {popupActive === "attack" && <Combat base={village} army={army} />}

      <button onClick={() => setActivePopup("attack")}>Attack</button>
    </div>
  );
};

export default App;
