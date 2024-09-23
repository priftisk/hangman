import PropTypes from "prop-types";
import WordleGridRow from "./WordleGridRow";
import { ROWS } from "../../helper/wordle";
import { Profiler, useEffect, useState } from "react";
export default function WordleGrid({ wordToGuess, currentRow }) {
  const wordArray = Array.from(wordToGuess);
  const [rowGuesses, setRowGuesses] = useState({});
  console.log(wordArray)
  useEffect(() => {
    if(currentRow === 1) return;
    debugger;
  }, [currentRow]);
  return (
    <div className="flex flex-col">
      {Array.from({ length: ROWS }, (row, rowIdx) => (
        <div key={rowIdx} className="flex gap-x-2 mb-2">
          <WordleGridRow
            wordToGuess={wordToGuess}
            currentRow={currentRow}
            rowIdx={rowIdx + 1}
            setRowGuesses={setRowGuesses}
          />
        </div>
      ))}
    </div>
  );
}

WordleGrid.propTypes = {
  wordToGuess: PropTypes.string,
  currentRow: PropTypes.number,
};
