import ReactDOM from "react-dom/client";
import { Suspense, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./app";
import queryClient from "./api/query-client";
import { BackdropGlobal } from "./components/ui/backdrop";
import { SnackbarProvider } from "notistack";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BackdropGlobal>
    <SnackbarProvider>
      <StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <Suspense>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </Suspense>
          </BrowserRouter>
        </HelmetProvider>
      </StrictMode>
    </SnackbarProvider>
  </BackdropGlobal>
);
