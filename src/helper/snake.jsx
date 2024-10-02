export const ROWS = 16;
export const COLS = 32;
export const SNAKE_LENGTH = 3;

export function GridInit() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isEmpty: true,
    }))
  );
}

export function addSegmentToSnake(setSnake) {
  setSnake((prev) => {
    const tail = prev.slice(-1)[0];
    // const beforeTail = prev[prev.length - 2] || tail; // In case the snake has only 1 segment

    // Calculate the direction of the tail
    const newSegment = {
      row: tail.row,
      col: tail.col,
    };

    return [...prev, newSegment];
  });
}

export function updateTargetPos(setTargetPos) {
  setTargetPos({
    row: parseInt(Math.random() * ROWS),
    col: parseInt(Math.random() * COLS),
  });
}

export function moveSnake(setSnake, direction, cells) {
  setSnake((prevSnake) => {
    const newPos = prevSnake.map((item, idx) => {
      if (idx === 0) {
        // Move head
        return {
          row: (item.row + direction.row + cells.length) % cells.length, // cells.length used to wrap around the row
          col: (item.col + direction.col + cells[0].length) % cells[0].length, //cells[0].length used to wrap around the col
        };
      } else {
        // Rest of body follows the previous cell's position
        return prevSnake[idx - 1];
      }
    });
    return newPos;
  });
}

export function SnakeInit(){
  return Array.from({ length: SNAKE_LENGTH }, (v, i) => ({ row: 0, col: i }))
}