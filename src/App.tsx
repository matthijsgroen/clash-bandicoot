import { army, village } from "./testScenarios/simpleVillage";
import { Combat } from "./components/Combat";

const App = () => {
  return <Combat base={village} army={army} />;
};

export default App;
