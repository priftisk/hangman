import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HangmanPage from "./pages/HangmanPage";
import HomePage from "./pages/HomePage";
import BattleFieldPage from "./pages/BattleFieldPage";
// import HowHighPage from "./pages/HowHighPage";
// import WordlePage from "./pages/WordlePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="hangman" element={<HangmanPage />} />
          <Route path="minefield" element={<BattleFieldPage />} />
          {/* <Route path="how-high" element={<HowHighPage />} />
          <Route path="wordle" element={<WordlePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
