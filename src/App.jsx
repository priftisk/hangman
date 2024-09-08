import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HangmanPage from "./pages/HangmanPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hangman" element={<HangmanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
