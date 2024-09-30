import { useEffect, useState } from "react";
import {
  addSegmentToSnake,
  COLS,
  GridInit,
  moveSnake,
  ROWS,
  SNAKE_LENGTH,
  updateTargetPos,
} from "../helper/snake";
import Cell from "../components/snake/Cell";
import SnakeLogo from "../components/snake/SnakeLogo";
export default function SnakePage() {
  const [cells, setCells] = useState(GridInit());
  const [snake, setSnake] = useState(
    Array.from({ length: SNAKE_LENGTH }, (v, i) => ({ row: 0, col: i }))
  );
  const [direction, setDirection] = useState({ row: 0, col: 1 }); // Moving right initially
  const [targetPos, setTargetPos] = useState({
    row: parseInt(Math.random() * ROWS),
    col: parseInt(Math.random() * COLS),
  });
  useEffect(() => {
    // Add event listener for keypress to change snake direction
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction.row === 0) setDirection({ row: -1, col: 0 });
          break;
        case "ArrowDown":
          if (direction.row === 0) setDirection({ row: 1, col: 0 });
          break;
        case "ArrowLeft":
          if (direction.col === 0) setDirection({ row: 0, col: -1 });
          break;
        case "ArrowRight":
          if (direction.col === 0) setDirection({ row: 0, col: 1 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const tick = setInterval(() => {
      moveSnake(setSnake, direction, cells);
    }, 150);

    return () => clearInterval(tick);
  }, [direction, cells]);

  useEffect(() => {
    if (snake[0].col === targetPos.col && snake[0].row === targetPos.row) {
      updateTargetPos(setTargetPos);
      addSegmentToSnake(setSnake);
    }
  }, [snake, setTargetPos, targetPos]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SnakeLogo />
      <table className="min-w-1/2 table-auto border-collapse border border-gray-300">
        <tbody>
          {cells.map((row, rowIdx) => (
            <tr key={rowIdx} className="odd:bg-gray-50 even:bg-white">
              {row.map((_, colIdx) => (
                <Cell
                  key={`${rowIdx}${colIdx}`}
                  colIdx={colIdx}
                  rowIdx={rowIdx}
                  snake={snake}
                  targetPos={targetPos}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
