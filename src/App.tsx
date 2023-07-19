import { army, village2 } from "./testScenarios/simpleVillage";
import { Combat } from "./app/Combat/Combat";
import { useState } from "react";
import { HomeScreen } from "./app/HomeScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [popupActive, setActivePopup] = useState<null | string>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {popupActive === "attack" && (
          <Combat
            base={village2}
            army={army}
            onClose={() => {
              setActivePopup(null);
            }}
          />
        )}
        {popupActive === null && (
          <HomeScreen
            setScreen={(name) => {
              setActivePopup(name);
            }}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
