import { useEffect, useState } from "react";
import Snake, { GridInit } from "../helper/snake";
import Cell from "../components/snake/Cell";

export default function SnakePage() {
  const [cells, setCells] = useState(GridInit());
  const snake = new Snake(3);
  const [pos, setPos] = useState(
    Array.from({ length: snake.size }, (v, i) => ({ row: 0, col: i }))
  );
  const [direction, setDirection] = useState({ row: 0, col: 1 }); // Moving right initially
  const [targetPos, setTargetPos] = useState({ row: 10, col: 12 });
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
      setPos((prevPos) => {
        const newPos = prevPos.map((item, idx) => {
          if (idx === 0) {
            // Move head
            return {
              row: (item.row + direction.row + cells.length) % cells.length, // cells.length used to wrap around the row
              col:
                (item.col + direction.col + cells[0].length) % cells[0].length, //cells[0].length used to wrap around the col
            };
          } else {
            // Rest of body follows the previous cell's position
            return prevPos[idx - 1];
          }
        });
        return newPos;
      });
    }, 200);

    return () => clearInterval(tick);
  }, [direction, cells]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-auto">
      <table className="min-w-1/2 table-auto border-collapse border border-gray-300">
        <tbody>
          {cells.map((row, rowIdx) => (
            <tr key={rowIdx} className="odd:bg-gray-50 even:bg-white">
              {row.map((_, colIdx) => (
                <Cell
                  key={`${rowIdx}${colIdx}`}
                  colIdx={colIdx}
                  rowIdx={rowIdx}
                  pos={pos}
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
