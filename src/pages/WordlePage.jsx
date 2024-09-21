import { useState } from "react";
import WordleGrid from "../components/wordle/WordleGrid";
import WordleLogo from "../components/wordle/WordleLogo";

export default function WordlePage() {
  const wordToGuess = "TURTLE";
  const [currentRow, setCurrentRow] = useState(1);
  return (
    <div
      id="container"
      className="flex items-center flex-col lg:min-h-[40rem] md:min-h-[20rem] font-serif"
    >
      <WordleLogo />
      <WordleGrid wordToGuess={wordToGuess} currentRow={currentRow} />
      <div className="mt-10">
        <button
          className="w-48 h-10  rounded-md bg-slate-500 font-serif text-xl font-bold text-white"
          onClick={() => setCurrentRow((prev) => prev + 1)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
