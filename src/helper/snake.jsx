export default class Snake {
  constructor(size, isAlive) {
    this.size = size;
    this.isAlive = isAlive;
  }

  eat(size = 1) {
    this.size += size;
  }

  kill() {
    this.isAlive = false;
  }
}
export const ROWS = 32;
export const COLS = 32;

export function GridInit() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isEmpty: true,
    }))
  );
}
