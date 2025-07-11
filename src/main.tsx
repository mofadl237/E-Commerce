import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "./app/store";
import { Provider } from "react-redux";
import InternetConnection from "./services/InternetConnection.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <InternetConnection>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </Provider>
  </InternetConnection>
);
