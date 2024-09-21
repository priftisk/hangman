import WordleRowItem from "./WordleRowItem";
import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { initializeRowGuess } from "../../helper/wordle";
export default function WordleGridRow({ wordToGuess, currentRow, rowIdx }) {
  const [rowGuess, setRowGuess] = useState({});

  useEffect(() => {
    setRowGuess(initializeRowGuess(wordToGuess));
  }, [wordToGuess]);
  const itemsPerRow = useMemo(() => {
    return wordToGuess.length;
  }, [wordToGuess]);

  const isCurrentRow = useMemo(() => {
    return currentRow === rowIdx;
  }, [currentRow, rowIdx]);

  return (
    <>
      {Array.from({ length: itemsPerRow }, (rowItem, rowItemIdx) => (
        <WordleRowItem
          content={wordToGuess[rowItemIdx]}
          key={rowItemIdx}
          isCurrentRow={isCurrentRow}
          row={rowItemIdx}
          rowGuess={rowGuess}
          setRowGuess={setRowGuess}
        />
      ))}
    </>
  );
}

WordleGridRow.propTypes = {
  itemsPerRow: PropTypes.number,
  wordToGuess: PropTypes.string,
  currentRow: PropTypes.number,
  rowIdx: PropTypes.number,
};
