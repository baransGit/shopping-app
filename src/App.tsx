/**
 * Main Application Component
 * This is the root component that sets up the core application structure
 * Includes:
 * - Redux for global state management
 * - React Query for server state management
 * - Router for navigation
 */
import { ReduxProvider } from "./app/providers/ReduxProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { Router } from "./app/router";

function App() {
  return (
    // QueryProvider wraps the entire app to enable React Query functionality
    <QueryProvider>
      {/* ReduxProvider enables global state management across the app */}
      <ReduxProvider>
        {/* Router handles all application routing and navigation */}
        <Router />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
