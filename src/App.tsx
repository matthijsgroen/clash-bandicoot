import { army } from "./testScenarios/simpleVillage";
import { useState } from "react";
import { HomeScreen } from "./app/HomeScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TargetSearch } from "./app/Combat/TargetSearch";

const queryClient = new QueryClient();

const App = () => {
  const [popupActive, setActivePopup] = useState<null | string>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <HomeScreen
          setScreen={(name) => {
            setActivePopup(name);
          }}
        />
        {popupActive === "attack" && (
          <TargetSearch
            army={army}
            onClose={() => {
              setActivePopup(null);
            }}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
