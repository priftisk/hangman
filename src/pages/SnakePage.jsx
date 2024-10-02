import { useEffect, useState } from "react";
import {
  addSegmentToSnake,
  COLS,
  GridInit,
  moveSnake,
  ROWS,
  SnakeInit,
  updateTargetPos,
} from "../helper/snake";
import Cell from "../components/snake/Cell";
import SnakeLogo from "../components/snake/SnakeLogo";

export default function SnakePage() {
  const [cells, setCells] = useState(GridInit());
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(SnakeInit());
  const [direction, setDirection] = useState({ row: 0, col: 1 }); // Moving right initially
  const [targetPos, setTargetPos] = useState({
    row: parseInt(Math.random() * ROWS),
    col: parseInt(Math.random() * COLS),
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [lost, setLost] = useState(false);

  // Handle key press for snake direction
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isPlaying) return; // Don't handle keypress if game is not playing
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
  }, [direction, isPlaying]);

  // Snake movement interval
  useEffect(() => {
    if (!isPlaying) return; // No movement if game is not playing

    const tick = setInterval(() => {
      moveSnake(setSnake, direction, cells);
    }, 100);

    return () => clearInterval(tick);
  }, [direction, cells, isPlaying]);

  // Check for target collision
  useEffect(() => {
    if (snake[0].col === targetPos.col && snake[0].row === targetPos.row) {
      //Check if head is on target
      updateTargetPos(setTargetPos);
      addSegmentToSnake(setSnake);
      setScore((prev) => prev + 1);
    }
    setLost(
      //Check if snake head has touched its body
      snake
        .slice(1)
        .findIndex(
          (item) => item.col === snake[0].col && item.row === snake[0].row
        ) !== -1
    );
  }, [snake, setTargetPos, targetPos, setLost]);

  const toggleGame = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    setLost(false);
    setSnake(SnakeInit());
    setDirection({ row: 0, col: 1 });
    setTargetPos({
      row: parseInt(Math.random() * ROWS),
      col: parseInt(Math.random() * COLS),
    });
    setIsPlaying(false);
  };

  useEffect(() => {
    if (lost) setIsPlaying(false);
  }, [lost]);

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isPlaying ? "hidden" : "visible"
        }`}
      >
        <button
          className="bg-slate-500 text-white py-2 px-4 rounded font-serif font-bold text-[2rem]"
          onClick={!isPlaying ? toggleGame : handleRestart}
        >
          {isPlaying ? "Restart" : "Start"}
        </button>
      </div>
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
        <span className="text-slate-400 text-[3rem] mt-4 font-bold font-serif">
          SCORE: {score}
        </span>
      </div>
    </>
  );
}
