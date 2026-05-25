# Q16 — Rat in a Maze

**Difficulty:** Medium
**Pattern:** Grid backtracking — find all paths from source to destination
**Expected:** O(4^(m·n)) time · O(m·n) space

## Problem

Given an `n x n` binary matrix `maze` where `0` represents a blocked cell and `1` represents an open cell, find all paths that a rat can take from the top-left corner `(0, 0)` to the bottom-right corner `(n-1, n-1)`. The rat can move in four directions: Up (`U`), Down (`D`), Left (`L`), Right (`R`). The rat cannot visit the same cell more than once in a single path.

Return all valid paths as strings sorted in lexicographic order. Return an empty list if no path exists.

## Examples

### Example 1
```
Input:  maze = [[1, 0, 0, 0],
                [1, 1, 0, 1],
                [1, 1, 0, 0],
                [0, 1, 1, 1]]
Output: ["DDRDRR","DRDDRR"]
```

### Example 2
```
Input:  maze = [[1, 0],
                [1, 0]]
Output: []
```
The destination cell is blocked.

## Constraints
- `2 <= n <= 5`
- `0 <= maze[i][j] <= 1`
- The source cell `maze[0][0]` is always `1`.

## Hints

<details>
<summary>Hint 1 — DFS from (0, 0)</summary>

Start a DFS at `(0, 0)`. At each step, try all four directions. Only move to a cell if it is within bounds, not visited, and not blocked (`maze[r][c] === 1`).
</details>

<details>
<summary>Hint 2 — track visited cells</summary>

Maintain a `visited` matrix (or mark the cell directly in `maze` as `0` and restore it after). When you reach `(n-1, n-1)`, record the current path string and return.
</details>

<details>
<summary>Hint 3 — build the path string during recursion</summary>

Pass the direction taken to each recursive call and append it to a path string. On backtracking, you don't need to "undo" the string — since strings are immutable in JavaScript, slicing or concatenation naturally produces independent copies at each branch.
</details>

## Write your solution
→ [`../solutions/16-rat-in-a-maze.js`](../solutions/16-rat-in-a-maze.js)

## Follow-ups
- Count the total number of distinct paths without listing them.
- **Unique Paths III** (LeetCode 980) — visit every non-obstacle cell exactly once.
- What if the maze has weighted cells and you want the minimum-cost path?
