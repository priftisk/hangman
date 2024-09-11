import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HangmanPage from "./pages/HangmanPage";
import HomePage from "./pages/HomePage";
import HowHighPage from "./pages/HowHighPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="hangman" element={<HangmanPage />} />
          <Route path="how-high" element={<HowHighPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
