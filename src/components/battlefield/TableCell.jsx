import PropTypes from "prop-types";
import ShipIcon from "../../icons/battlefield/ship";
import FinishIcon from "../../icons/battlefield/finish";
import { useMemo } from "react";
export default function TableCell({ colIdx, rowIdx, cellState, handleDrop }) {
  const hasBeenVisited = useMemo(() => cellState.hasBeenVisited, [cellState]);
  const isFinishCell = useMemo(() => cellState.isFinishCell, [cellState]);
  const hasPlayer = useMemo(() => cellState.hasPlayer, [cellState]);

  const onDragStart = (e) => {
    // Store the source cell's coordinates
    e.dataTransfer.setData("sourceCell", JSON.stringify({ rowIdx, colIdx }));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const sourceCell = JSON.parse(e.dataTransfer.getData("sourceCell"));

    // Pass the source and target cell coordinates to handleDrop
    handleDrop(sourceCell.rowIdx, sourceCell.colIdx, rowIdx, colIdx);
  };

  return (
    <td
      id={`${rowIdx}-${colIdx}`}
      className={`px-4 py-2 border border-black cursor-move w-24 h-24 ${
        hasBeenVisited ? "bg-gray-700" : "bg-slate-600"
      }`}
      draggable={hasPlayer} // Only allow dragging if the cell has a player
      onDragStart={hasPlayer ? onDragStart : null}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {hasPlayer && <ShipIcon />}
      {isFinishCell && <FinishIcon />}
    </td>
  );
}

TableCell.propTypes = {
  colIdx: PropTypes.number,
  rowIdx: PropTypes.number,
  cellState: PropTypes.object,
  handleDrop: PropTypes.func,
};
