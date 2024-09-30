import { useMemo } from "react";
import PropTypes from "prop-types";
export default function Cell({ pos, rowIdx, colIdx, targetPos }) {
  const hasSnake = useMemo(() => {
    return (
      pos.findIndex((item) => item.row === rowIdx && item.col === colIdx) !== -1
    );
  }, [pos, colIdx, rowIdx]);
  const hasTarget = useMemo(() => {
    return targetPos.col === colIdx && targetPos.row === rowIdx;
  }, [targetPos, colIdx, rowIdx]);
  return (
    <td
      className={`border border-black cursor-move w-4 h-4 ${
        hasSnake ? "bg-green-600" : hasTarget ? "bg-red-400" : "bg-slate-600"
      }`}
      key={`${rowIdx}${colIdx}`}
    ></td>
  );
}

Cell.propTypes = {
  pos: PropTypes.array,
  rowIdx: PropTypes.number,
  colIdx: PropTypes.number,
  targetPos: PropTypes.object,
};
