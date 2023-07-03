import { army, village2, replay } from "./testScenarios/simpleVillage";
import { Combat } from "./components/Combat";
import { useState } from "react";
import { Button } from "./components/Button";

const App = () => {
  const [popupActive, setActivePopup] = useState<null | "attack">(null);

  return (
    <div>
      {popupActive === "attack" && (
        <Combat base={village2} army={army} replay={replay} />
      )}

      <Button onClick={() => setActivePopup("attack")}>Attack</Button>
    </div>
  );
};

export default App;
