import { useEffect, useState } from "react";
import TableCell from "../components/battlefield/TableCell";
import {
  battlefieldInit,
  hasBeenVisited,
  isAdjacentCell,
  isEmptyCell,
  isFinishCell,
} from "../helper/battlefield";
export default function BattleFieldPage() {
  const rows = 8;
  const cols = 8;

  const [cells, setCells] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        empty: true,
        hasPlayer: false,
        isStartingCell: false,
        isFinishCell: false,
        hasBomb: false,
        hasBeenVisited: false,
      }))
    )
  );

  useEffect(() => {
    battlefieldInit(setCells, rows, cols);
  }, [rows, cols, setCells]);

  const handleDrop = (sourceRow, sourceCol, targetRow, targetCol) => {
    let targetCell = cells[targetRow][targetCol];
    // let sourceCell = cells[sourceRow][sourceCol];
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
      // If it's the finish cell, return
      console.log("Invalid move: Cell already been visited");
      return;
    }

    if (isFinishCell({ cell: targetCell })) {
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
    }
  };

  return (
    <div className="overflow-x-auto">
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
