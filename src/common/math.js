export const round = (num, gridSize) => Math.floor(num / gridSize) * gridSize
export const clamp = (num, gridSize = 1, size = 60) => Math.min(Math.max(num, 0), size - gridSize)
export const gridUnit = (num, gridSize = 1, size = 60) => {
  return clamp(round(num, gridSize), gridSize, size)
}