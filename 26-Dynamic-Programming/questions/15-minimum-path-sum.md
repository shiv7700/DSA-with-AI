# Q15 — Minimum Path Sum

**Difficulty:** Medium
**Pattern:** 2D grid DP — path cost minimization
**Expected:** O(m × n) time · O(n) space

## Problem

Given an `m × n` grid filled with non-negative integers, find a path from the top-left corner to the bottom-right corner which minimizes the sum of all numbers along the path. You can only move right or down.

## Examples

### Example 1
```
Input:
grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]
Output: 7
```
Path 1 → 3 → 1 → 1 → 1 = 7.

### Example 2
```
Input:
grid = [
  [1, 2, 3],
  [4, 5, 6]
]
Output: 12
```
Path 1 → 2 → 3 → 6 = 12.

## Constraints
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`

## Hints

<details>
<summary>Hint 1 — the recurrence</summary>

`dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])`

The cost to reach `(r, c)` is the cell's own value plus the minimum cost to reach either neighbor.
</details>

<details>
<summary>Hint 2 — base cases</summary>

`dp[0][0] = grid[0][0]`. First row: sum running rightward (only one way to get there). First column: sum running downward.
</details>

<details>
<summary>Hint 3 — in-place optimization</summary>

You can overwrite `grid` itself as your `dp` table (if mutation is allowed), saving additional space.
</details>

## Write your solution
→ [`../solutions/15-minimum-path-sum.js`](../solutions/15-minimum-path-sum.js)

## Follow-ups
- **Triangle** (Q16) — similar minimum-path problem but on a triangle shape, top to bottom.
- What is the actual path (sequence of cells), not just the minimum sum?
