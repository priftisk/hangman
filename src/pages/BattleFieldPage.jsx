import { useEffect, useMemo, useState } from "react";
import TableCell from "../components/battlefield/TableCell";
import {
  battlefieldInit,
  hasBeenVisited,
  hasNoValidMoves,
  isAdjacentCell,
  isEmptyCell,
  isFinishCell,
  gridInit,
  hasBomb,
} from "../helper/battlefield";
import GameOverScreen from "../components/battlefield/GameOverScreen";
import useError from "../hooks/useError";
import MineFieldLogo from "../components/battlefield/MineFieldLogo";
import YouWonScreen from "../components/battlefield/YouWonScreen";
export default function BattleFieldPage() {
  const [currentPos, setCurrentPos] = useState({ row: "", col: "" });
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [cells, setCells] = useState(gridInit());
  const [showBombs, setShowBombs] = useState(false);
  const {error, setError} = useError();
  const [youWon, setYouWon] = useState(false)
  const movesMade = useMemo(() => {
    return cells.reduce((acc, row) => {
      return acc + row.reduce((rowAcc, cell) => cell.hasBeenVisited ? rowAcc + 1 : rowAcc, 0);
    }, 0);
  }, [cells]);
  
  const displayBombsTemporarily = () => {
    setShowBombs(true);
    setTimeout(() => setShowBombs(false), 5000);
  };
  useEffect(() => {
    battlefieldInit(setCells);
    displayBombsTemporarily();
  }, [setCells]);

  const handleRestart = () => {
    setCells(gridInit());
    setCurrentPos({ row: "", col: "" });
    battlefieldInit(setCells);
    displayBombsTemporarily();
    setYouWon(false)
    setGameOver(false);
    setGameOverReason("");
  };

  useEffect(() => {
    //Checks if game is over when there are no more available moves
    if (currentPos.col === "" && currentPos.row === "") return;
    if (hasNoValidMoves(cells, currentPos.row, currentPos.col)) {
      setGameOverReason("No valid moves");
      setGameOver(true);
      setShowBombs(true);
    }
  }, [currentPos, cells]);

  const handleDrop = (sourceRow, sourceCol, targetRow, targetCol) => {
    let targetCell = cells[targetRow][targetCol];
    if (
      !isAdjacentCell({
        sourceRow: sourceRow,
        soureCol: sourceCol,
        targetCol: targetCol,
        targetRow: targetRow,
      })
    ) {
      return setError("Invalid move: Must be an adjacent cell")
       
    }
    if (hasBeenVisited({ cell: targetCell })) {
      // If cell has been visited, return
      return setError("Invalid move: Cell already been visited");
    }

    if (hasBomb({ cell: targetCell })) {
      setGameOver(true);
      setGameOverReason("You hit a bomb");
      return;
    }

    if (isFinishCell({ cell: targetCell })) {
      // If it's the finish cell, return
      setYouWon(true)
      return;
    }

    // Check if the target cell is empty
    if (isEmptyCell({ cell: targetCell })) {
      const newCells = cells.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          if (rowIdx === targetRow && colIdx === targetCol) {
            return {
              ...cell,
              empty: false,
              hasPlayer: true,
              hasBeenVisited: true,
            };
          }
          if (rowIdx === sourceRow && colIdx === sourceCol) {
            return { ...cell, empty: true, hasPlayer: false };
          }
          return cell;
        })
      );
      setCells(newCells);
      setCurrentPos({ row: targetRow, col: targetCol });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen overflow-x-auto">
      <GameOverScreen
        gameOver={gameOver}
        gameOverText={gameOverReason}
        handleRestart={handleRestart}
      />
      <YouWonScreen youWon={youWon} handleRestart={handleRestart} movesMade={movesMade}/>
      <MineFieldLogo />
      <table className="min-w-1/2 table-auto border-collapse border border-gray-300">
        <tbody>
          {cells.map((row, rowIdx) => (
            <tr key={rowIdx} className="odd:bg-gray-50 even:bg-white">
              {row.map((_, colIdx) => (
                <TableCell
                  key={colIdx}
                  rowIdx={rowIdx}
                  colIdx={colIdx}
                  cellState={cells[rowIdx][colIdx]}
                  handleDrop={handleDrop}
                  showBombs={showBombs}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {error.length > 0 &&<span className="font-bold text-red-600 text-2xl font-serif bg-slate-800 p-4 rounded-lg">{error}</span> }
    </div>
  );
}
