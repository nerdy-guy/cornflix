import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: Infinity,
  //     cacheTime: Infinity,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
