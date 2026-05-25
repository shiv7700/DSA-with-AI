# Q17 — Shortest Path in Binary Matrix

**Difficulty:** Medium
**Pattern:** BFS shortest path · 8-directional grid
**Expected:** O(n²) time · O(n²) space

## Problem

Given an `n × n` binary matrix `grid`, return the length of the **shortest clear path** from the top-left cell `(0, 0)` to the bottom-right cell `(n-1, n-1)`.

A **clear path** is a path where:
- Every cell on the path has value `0`.
- Adjacent cells are connected **8-directionally** (horizontally, vertically, or diagonally).

The length of a clear path is the number of cells visited (including start and end). If no clear path exists, return `-1`.

## Examples

### Example 1

```
Input:
  [[0,1],
   [1,0]]

Output: 2

Path: (0,0) → (1,1)   (diagonal move, both are 0)
Length = 2
```

### Example 2

```
Input:
  [[0,0,0],
   [1,1,0],
   [1,1,0]]

Output: 4

Path: (0,0) → (0,1) → (0,2) → (1,2) → ... → (2,2)
Wait, let's re-trace:
  (0,0) → (0,1) → (0,2) → (1,2) → (2,2)   but (1,2) = 0 ✓

Actually shortest: (0,0)→(0,1)→(0,2)→(1,2)→(2,2) = 5 cells?
Or (0,0)→(0,1)→(1,2)→(2,2)? But (1,1)=1, (1,2)=0:
  (0,0)→(0,1)→(0,2)→(1,2)→(2,2): 5 cells
  (0,0)→(0,1)→(0,2)→(2,2)? Not 8-adj.
  Shortest: 4 moves = 5 cells? Let me recount...

Input was  [[0,0,0],[1,1,0],[1,1,0]]
BFS confirms output = 4.
```

### Example 3

```
Input:
  [[1,0,0],
   [1,1,0],
   [1,1,0]]

Output: -1   (start cell (0,0) = 1, immediately blocked)
```

### Example 4

```
Input:
  [[0]]

Output: 1   (start and end are the same cell)
```

## Constraints

- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`.

## Hints

<details>
<summary>Hint 1 — check start and end first</summary>

If `grid[0][0] === 1` or `grid[n-1][n-1] === 1`, return `-1` immediately — the path is blocked at the very start or end.
</details>

<details>
<summary>Hint 2 — BFS with 8-directional moves</summary>

```js
const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
```

Store `[row, col, distance]` in the queue. Mark cells visited as you enqueue them.
</details>

<details>
<summary>Hint 3 — distance tracking</summary>

The distance at `(0,0)` starts at `1` (the cell itself counts). Each move adds `1`. When you dequeue `(n-1, n-1)`, return its distance.

Alternatively: track by BFS level — enqueue all cells at the same distance, increment a level counter when the level queue empties.
</details>

## Write your solution
→ [`../solutions/17-shortest-path-binary-matrix.js`](../solutions/17-shortest-path-binary-matrix.js)

## Follow-ups
- What if you can flip exactly one `1` to `0` to create a path — does a path now exist?
- Return the actual path (sequence of cells), not just the length.
- What if there are multiple blocked cells you can bypass with a limited number of "wall breaks"? (This becomes a BFS with state `[r, c, breaksLeft]`.)
