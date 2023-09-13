import { HomeScreen } from "./app/HomeScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
};

export default App;
