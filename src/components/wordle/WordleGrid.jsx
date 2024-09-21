import PropTypes from "prop-types";
import WordleGridRow from "./WordleGridRow";
import { ROWS } from "../../helper/wordle";
export default function WordleGrid({ wordToGuess, currentRow }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: ROWS }, (row, rowIdx) => (
        <div key={rowIdx} className="flex gap-x-2 mb-2">
          <WordleGridRow
            wordToGuess={wordToGuess}
            currentRow={currentRow}
            rowIdx={rowIdx + 1}
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
