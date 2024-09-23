export function battlefieldInit(setCells, rows, cols) {
  setCells((prevCells) => {
    const updatedCells = prevCells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === 0 && colIndex === 0) {
          return {
            ...cell,
            empty: false,
            isStartingCell: true,
            hasPlayer: true,
            hasBeenVisited: true,
          };
        }
        if (rowIndex === rows - 1 && colIndex === cols - 1) {
          return { ...cell, empty: false, isFinishCell: true };
        }
        return cell;
      })
    );
    return updatedCells;
  });
}

export function isFinishCell({ cell }) {
  return cell.isFinishCell;
}
export function isEmptyCell({ cell }) {
  return cell.empty;
}

export function hasBeenVisited({ cell }) {
  return cell.hasBeenVisited;
}

export function isAdjacentCell({ sourceRow, soureCol, targetRow, targetCol }) {
  let verticalMovement = Math.abs(targetCol - soureCol);
  let horizontalMovement = Math.abs(targetRow - sourceRow);
  if (verticalMovement > 1 || horizontalMovement > 1) {
    return false;
  }
  return true;
}
