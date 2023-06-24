import { layout as village } from "./testScenarios/simpleVillage";
import { Combat } from "./components/Combat";

const App = () => {
  return <Combat base={village} />;
};

export default App;
