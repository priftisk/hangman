export const ROWS = 8;
export const COLS = 8;

export function battlefieldInit(setCells) {
  setCells((prevCells) => {
    const updatedCells = [...prevCells];

    // Update the starting cell (0,0)
    updatedCells[0] = [...updatedCells[0]]; // Create a shallow copy of the row
    updatedCells[0][0] = {
      ...updatedCells[0][0],
      empty: false,
      isStartingCell: true,
      hasPlayer: true,
      hasBeenVisited: true,
    };

    // Update the finish cell (ROWS-1, COLS-1)
    updatedCells[ROWS - 1] = [...updatedCells[ROWS - 1]]; // Create a shallow copy of the row
    updatedCells[ROWS - 1][COLS - 1] = {
      ...updatedCells[ROWS - 1][COLS - 1],
      empty: false,
      isFinishCell: true,
    };

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

export function hasNoValidMoves(cells, sourceRow, soureCol) {
  //TODO handle diagonal cells
  let leftCell =
    soureCol > 0 ? cells[sourceRow][soureCol - 1] : cells[sourceRow][soureCol];
  let rightCell =
    soureCol < COLS - 1
      ? cells[sourceRow][soureCol + 1]
      : cells[sourceRow][soureCol];
  let topCell =
    sourceRow < ROWS - 1
      ? cells[sourceRow + 1][soureCol]
      : cells[sourceRow][soureCol];
  let bottomCell =
    sourceRow > 0 ? cells[sourceRow - 1][soureCol] : cells[sourceRow][soureCol];
  return (
    leftCell.hasBeenVisited &&
    rightCell.hasBeenVisited &&
    bottomCell.hasBeenVisited &&
    topCell.hasBeenVisited
  );
}

export function gridInit() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      empty: true,
      hasPlayer: false,
      isStartingCell: false,
      isFinishCell: false,
      hasBomb: false,
      hasBeenVisited: false,
    }))
  );
}
