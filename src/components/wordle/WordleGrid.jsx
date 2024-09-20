import { useMemo } from "react";
import WordleGridItem from "./WordleGridItem";
import PropTypes from 'prop-types';
export default function WordleGrid({ wordToGuess }) {
  const rows = 5;
  const itemsPerRow = useMemo(() => {
    return wordToGuess.length;
  }, [wordToGuess]);

  return (
    <div className="flex flex-col">
      {Array.from({ length: rows }, (row, rowIdx) => (
        <div key={rowIdx} className="flex gap-x-2 mb-2">
          {Array.from({ length: itemsPerRow }, (rowItem, rowItemIdx) => (
            <WordleGridItem content={wordToGuess[rowItemIdx]} key={rowItemIdx} />
          ))}
        </div>
      ))}
    </div>
  );
}


WordleGrid.propTypes =  {
    wordToGuess : PropTypes.string
} 