# Q17 — Unique Paths III

**Difficulty:** Hard
**Pattern:** Grid backtracking — visit every non-obstacle cell exactly once
**Expected:** O(3^(m·n)) time · O(m·n) space

## Problem

You are given an `m x n` integer array `grid` where:
- `1` represents the starting square,
- `2` represents the ending square,
- `0` represents empty squares you can walk over,
- `-1` represents obstacles you cannot step on.

Return the number of 4-directional walks from the starting square to the ending square that walk over every non-obstacle square exactly once.

## Examples

### Example 1
```
Input:  grid = [[1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 2,-1]]
Output: 2
```

### Example 2
```
Input:  grid = [[1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 2]]
Output: 4
```

### Example 3
```
Input:  grid = [[0, 1],
                [2, 0]]
Output: 0
```

## Constraints
- `m == grid.length`, `n == grid[i].length`
- `1 <= m, n <= 20`
- `1 <= m * n <= 20`
- `-1 <= grid[i][j] <= 2`
- There is exactly one starting square and one ending square.

## Hints

<details>
<summary>Hint 1 — count non-obstacle cells upfront</summary>

Before DFS, count the total number of cells that are not obstacles (i.e., `grid[r][c] !== -1`). A valid path visits all of them, ending at the cell with value `2`.
</details>

<details>
<summary>Hint 2 — DFS with step counter</summary>

Track the number of cells visited so far. When you reach the ending cell (`grid[r][c] === 2`), check whether `steps === totalNonObstacle`. If yes, increment the answer.
</details>

<details>
<summary>Hint 3 — in-place visited marking</summary>

Temporarily overwrite the current cell with `-1` before recursing (marking it as visited/obstacle), then restore it after recursing. This avoids a separate visited matrix.
</details>

## Write your solution
→ [`../solutions/17-unique-paths-iii.js`](../solutions/17-unique-paths-iii.js)

## Follow-ups
- **Rat in a Maze** — find and list paths rather than count them.
- **Unique Paths** (DP version) — count paths without the "visit every cell" constraint.
- How does the small constraint `m * n <= 20` hint at the intended approach?
