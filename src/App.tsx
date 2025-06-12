/**
 * Main Application Component
 * This is the root component that sets up the core application structure
 * Includes:
 * - Redux for global state management
 * - React Query for server state management
 * - Router for navigation
 */
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ReduxProvider } from "./app/providers/ReduxProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { Router } from "./app/router";
import { Toaster } from "./components/ui/toaster";

const system = createSystem(defaultConfig);

function App() {
  return (
    // ChakraProvider with modern v2 API
    <ChakraProvider value={system}>
      {/* QueryProvider wraps the entire app to enable React Query functionality */}
      <QueryProvider>
        {/* ReduxProvider enables global state management across the app */}
        <ReduxProvider>
          {/* Router handles all application routing and navigation */}
          <Router />
          {/* Toaster component for toast notifications */}
          <Toaster />
        </ReduxProvider>
      </QueryProvider>
    </ChakraProvider>
  );
}

export default App;
