import { GAME_SIZE } from "./constants";

export const round = (num, gridSize) => Math.floor(num / gridSize) * gridSize;

export const clamp = (num, gridSize = 1, size = GAME_SIZE) =>
  Math.min(Math.max(num, 0), size - gridSize);

export const gridUnit = (num, gridSize = 1, size = GAME_SIZE) => {
  return clamp(round(num, gridSize), gridSize, size);
};

export const wrapInGrid = (num, size = GAME_SIZE) => {
  if (num >= size) {
    return 0;
  }

  if (num <= 0) {
    return size - 1;
  }

  return num;
};
