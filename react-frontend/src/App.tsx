import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthPage, OAuthCallbackPage } from "@pages/auth";
import { HomePage } from "@pages/home";
import { MePage } from "@pages/me";
// import { useApi } from "@shared/api/my-api";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// useApi();
function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />

          <Route path="/auth" element={<AuthPage></AuthPage>} />
          <Route path="/auth/oauth/:provider" element={<OAuthCallbackPage />} />

          <Route path="/me" element={<MePage></MePage>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
