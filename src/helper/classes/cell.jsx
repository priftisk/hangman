class Cell {
  constructor(empty, hasPlayer, isStartingCell, isFinishCell, hasBomb) {
    this.empty = empty;
    this.hasBomb = hasBomb;
    this.hasPlayer = hasPlayer;
    this.isStartingCell = isStartingCell;
    this.isFinishCell = isFinishCell;
  }

  isFinish() {
    return this.isFinishCell;
  }

  isEmpty() {
    return this.empty;
  }

  isStarting() {
    return this.isStartingCell;
  }
}

export default Cell;
