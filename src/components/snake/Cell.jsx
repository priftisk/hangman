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
      className={`w-8 h-8 ${
        hasSnake
          ? isHead
            ? "bg-green-800 border border-green-900"
            : "bg-green-600 border border-green-700"
          : "bg-slate-600"
      }`}
      key={`${rowIdx}-${colIdx}`}
    >
      {hasTarget && (
        <div className="flex items-center justify-center">
          <svg height="20" width="20">
            <circle r="10" cx="10" cy="10" fill="red" />
          </svg>
        </div>
      )}
    </td>
  );
}

Cell.propTypes = {
  snake: PropTypes.array,
  rowIdx: PropTypes.number,
  colIdx: PropTypes.number,
  targetPos: PropTypes.object,
};
