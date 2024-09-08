import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HangmanPage from "./pages/HangmanPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HangmanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
