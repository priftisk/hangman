import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HangmanPage from "./pages/HangmanPage";
import HomePage from "./pages/HomePage";
import CanvasPage from "./pages/CanvasPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="hangman" element={<HangmanPage />} />
          <Route path="canvas" element={<CanvasPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
