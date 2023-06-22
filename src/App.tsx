import React, { useState } from "react";
import { layout as village } from "./testScenarios/simpleVillage";
import { Village } from "./components/Village";

const App = () => {
  const [layout, setLayout] = useState(village);

  return (
    <div>
      <main>
        <Village layout={layout} />
      </main>
      <aside></aside>
    </div>
  );
};

export default App;
