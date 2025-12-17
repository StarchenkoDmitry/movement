import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthPage } from "@pages/auth";
import { HomePage } from "@pages/home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/auth" element={<AuthPage></AuthPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
