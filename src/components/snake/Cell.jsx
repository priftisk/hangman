import { useMemo } from "react";
import PropTypes from "prop-types";
export default function Cell({ snake, rowIdx, colIdx, targetPos }) {
  const isHead = useMemo(() => {
    let head = snake.at(0);
    return head.row === rowIdx && head.col === colIdx;
  }, [snake, colIdx, rowIdx]);
  const hasSnake = useMemo(() => {
    return (
      snake.findIndex((item) => item.row === rowIdx && item.col === colIdx) !==
      -1
    );
  }, [snake, colIdx, rowIdx]);
  const hasTarget = useMemo(() => {
    return targetPos.col === colIdx && targetPos.row === rowIdx;
  }, [targetPos, colIdx, rowIdx]);
  return (
    <td
      className={`border border-black cursor-move w-8 h-8 transition-all duration-100 ${
        hasSnake
          ? isHead
            ? "bg-green-800"
            : "bg-green-600"
          : hasTarget
          ? "bg-red-400"
          : "bg-slate-600"
      }`}
      key={`${rowIdx}${colIdx}`}
    ></td>
  );
}

Cell.propTypes = {
  snake: PropTypes.array,
  rowIdx: PropTypes.number,
  colIdx: PropTypes.number,
  targetPos: PropTypes.object,
};
