import { useEffect, useState } from "react";
import TableCell from "../components/battlefield/TableCell";
import {
  battlefieldInit,
  hasBeenVisited,
  hasNoValidMoves,
  isAdjacentCell,
  isEmptyCell,
  isFinishCell,
  gridInit,
} from "../helper/battlefield";
import GameOverScreen from "../components/battlefield/GameOverScreen";
export default function BattleFieldPage() {
  const [currentPos, setCurrentPos] = useState({ row: "", col: "" });
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [cells, setCells] = useState(gridInit());
  useEffect(() => {
    battlefieldInit(setCells);
  }, [setCells]);

  const handleRestart = () => {
    setCells(gridInit())
    setCurrentPos({ row: "", col: "" });
    battlefieldInit(setCells);
    setGameOver(false);
    setGameOverReason("");
  };

  useEffect(() => {
    if (currentPos.col === "" && currentPos.row === "") return;
    if (hasNoValidMoves(cells, currentPos.row, currentPos.col)) {
      setGameOverReason("No valid moves");
      setGameOver(true);
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
      console.log("Invalid move: Must be an adjacent cell");
      return;
    }
    if (hasBeenVisited({ cell: targetCell })) {
      // If cell has been visited, return
      console.log("Invalid move: Cell already been visited");
      return;
    }

    if (isFinishCell({ cell: targetCell })) {
      // If it's the finish cell, return
      console.log("You Won");
      return;
    }

    // Check if the target cell is empty
    if (isEmptyCell({ cell: targetCell })) {
      const newCells = cells.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          if (rowIdx === targetRow && colIdx === targetCol) {
            // Mark the target cell with the player
            return {
              ...cell,
              empty: false,
              hasPlayer: true,
              hasBeenVisited: true,
            };
          } else if (rowIdx === sourceRow && colIdx === sourceCol) {
            // Remove the player from the source cell
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
    <div className="overflow-x-auto">
      <GameOverScreen
        gameOver={gameOver}
        gameOverText={gameOverReason}
        handleRestart={handleRestart}
      />
      <table className="min-w-full table-auto border-collapse border border-gray-300">
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
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
