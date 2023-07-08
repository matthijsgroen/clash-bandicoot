import { army, village2 } from "./testScenarios/simpleVillage";
import { Combat } from "./app/Combat";
import { useState } from "react";
import { HomeScreen } from "./app/HomeScreen";
import { VillageEditor } from "./app/VillageEditor";
import { newLayout } from "./engine/layout/baseLayout";

const App = () => {
  const [popupActive, setActivePopup] = useState<null | string>(null);

  return (
    <div>
      {popupActive === "attack" && <Combat base={village2} army={army} />}
      {popupActive === "villageEditor" && <VillageEditor base={newLayout()} />}
      {popupActive === null && (
        <HomeScreen
          setActivePopup={(name) => {
            setActivePopup(name);
          }}
        />
      )}
    </div>
  );
};

export default App;
