// The 8 spots to check relative to any 
const DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

// evolve :: Board -> Board
// 1. Any live cell with fewer than two live neighbors dies, as if caused by under­population.
// 2. Any live cell with two or three live neighbors lives on to the next generation.
// 3. Any live cell with more than three live neighbors dies, as if by over­population.
// 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
export default grid =>
  grid.map((columns, x) =>
    columns.map((isLive, y) => {
      const numberOfNeighbors = DELTAS
        .map(delta => [delta[0] + x, delta[1] + y])
        .filter(([column, row]) =>
          column >= 0 &&
          row >= 0 &&
          column < grid.length &&
          row < columns.length
        )
        .reduce((acc, [column, row]) => acc + grid[column][row], 0);

      return isLive
        ? +(numberOfNeighbors === 2 || numberOfNeighbors === 3)
        : +(numberOfNeighbors === 3);
    })
  );

