export const ROWS = 8;
export const COLS = 8;
export const MAX_BOMBS = 20


export function battlefieldInit(setCells) {
  setCells((prevCells) => {
    const updatedCells = [...prevCells];

    // Update the starting cell (0,0)
    updatedCells[0] = [...updatedCells[0]];
    updatedCells[0][0] = {
      ...updatedCells[0][0],
      empty: false,
      isStartingCell: true,
      hasPlayer: true,
      hasBeenVisited: true,
    };

    // Update the finish cell (ROWS-1, COLS-1)
    updatedCells[ROWS - 1] = [...updatedCells[ROWS - 1]];
    updatedCells[ROWS - 1][COLS - 1] = {
      ...updatedCells[ROWS - 1][COLS - 1],
      empty: false,
      isFinishCell: true,
    };

    // Helper function to generate random row and column indices
    const getRandomCell = () => {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);
      return { row, col };
    };

    let bombsPlanted = 0;
    while (bombsPlanted < MAX_BOMBS) {
      const { row, col } = getRandomCell();

      // Skip if the random cell is (0, 0) or (ROWS-1, COLS-1)
      if ((row === 0 && col === 0) || (row === ROWS - 1 && col === COLS - 1)) {
        continue;
      }

      // Skip if the cell already has a bomb
      if (updatedCells[row][col]?.hasBomb) {
        continue;
      }

      // Plant the bomb
      updatedCells[row] = [...updatedCells[row]];
      updatedCells[row][col] = {
        ...updatedCells[row][col],
        hasBomb: true,
      };

      bombsPlanted++;
    }

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

export function hasBomb({ cell }) {
  return cell.hasBomb;
}

export function isAdjacentCell({ sourceRow, soureCol, targetRow, targetCol }) {
  let verticalMovement = Math.abs(targetCol - soureCol);
  let horizontalMovement = Math.abs(targetRow - sourceRow);
  if (verticalMovement > 1 || horizontalMovement > 1) {
    return false;
  }
  return true;
}

export function hasNoValidMoves(cells, sourceRow, sourceCol) {
  const getCell = (row, col) =>
    row >= 0 && row < ROWS && col >= 0 && col < COLS
      ? cells[row][col]
      : cells[sourceRow][sourceCol]; // Default to the current cell if out of bounds

  const neighbors = [
    getCell(sourceRow, sourceCol - 1), // Left
    getCell(sourceRow, sourceCol + 1), // Right
    getCell(sourceRow + 1, sourceCol), // Top
    getCell(sourceRow - 1, sourceCol), // Bottom
    getCell(sourceRow + 1, sourceCol - 1), // Top-left
    getCell(sourceRow + 1, sourceCol + 1), // Top-right
    getCell(sourceRow - 1, sourceCol - 1), // Bottom-left
    getCell(sourceRow - 1, sourceCol + 1), // Bottom-right
  ];

  return neighbors.every((cell) => cell.hasBeenVisited);
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
