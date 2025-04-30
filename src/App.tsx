import { ReduxProvider } from "./app/providers/ReduxProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { Router } from "./app/router";

function App() {
  return (
    <QueryProvider>
      <ReduxProvider>
        <Router />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
